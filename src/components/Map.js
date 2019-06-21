import React, { createContext, useContext, useEffect, useState } from 'react';
import L from 'leaflet';
import styled from 'styled-components/macro';
import { getPins } from '../api/pins';

const LeafletMap = styled.div`
  height: 100%;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  pointer-events: none;
  > * {
    pointer-events: auto;
  }
`;

export const presetLocations = [
  { lat: -33.865143, lng: 151.2099, zoom: 13 }, // Sydney
  { lat: 51.5080073, lng: -0.111216, zoom: 12 }, // London
  { lat: 40.7149466, lng: -73.9874294, zoom: 12 }, // New York
  { lat: 35.6600735, lng: 139.7896097, zoom: 12 }, // Tokyo
  { lat: 48.8482098, lng: 2.3331542, zoom: 13 }, // Paris
  { lat: 37.5505925, lng: 126.9861072, zoom: 12 }, // Seoul
  { lat: 43.6502206, lng: -79.3789084, zoom: 13 }, // Toronto
  { lat: 52.5146624, lng: 13.3917431, zoom: 12 }, // Berlin
  { lat: 64.1414109, lng: -21.9370728, zoom: 13 }, // Reykjavik
  { lat: 21.0348333, lng: 105.8376496, zoom: 13 }, // Hanoi
  { lat: 41.0168994, lng: 28.9764374, zoom: 13 }, // Istanbul
  { lat: -36.8585738, lng: 174.7459584, zoom: 12 }, // Auckland
  { lat: 38.6973994, lng: -9.1416662, zoom: 12 }, // Lisbon
  { lat: 59.9076408, lng: 10.747173, zoom: 12 }, // Oslo
  { lat: 47.6010548, lng: -122.3353615, zoom: 12 }, // Seattle
  { lat: -22.9249526, lng: -43.1753137, zoom: 13 }, // Rio de Janeiro
  { lat: 19.0607823, lng: 72.8794583, zoom: 12 }, // Mumbai
  { lat: 55.6765714, lng: 12.564983, zoom: 13 }, // Copenhagen
  { lat: 50.4478506, lng: 30.539526, zoom: 13 }, // Kiev
];

export function getRandomLocation() {
  return presetLocations[Math.floor(Math.random() * presetLocations.length)];
}

export function setMapInteractive(map, shouldBeInteractive) {
  const action = shouldBeInteractive ? 'enable' : 'disable';
  map.dragging[action]();
  map.touchZoom[action]();
  map.doubleClickZoom[action]();
  map.scrollWheelZoom[action]();
  map.boxZoom[action]();
  map.keyboard[action]();
  if (map.tap) map.tap[action]();

  if (shouldBeInteractive && !map.zoomControl) {
    map.zoomControl = L.control.zoom({ position: 'bottomright' });
    map.addControl(map.zoomControl);
  } else if (!shouldBeInteractive && map.zoomControl) {
    map.removeControl(map.zoomControl);
  }
}

export const MapContext = createContext({
  map: null,
  pins: [],
  isLoading: false,
  isLocating: false,
  loadPins: null,
  clearPins: null,
  locate: null,
  showPin: null,
});

export function useMap() {
  return useContext(MapContext);
}

function Map({ children }) {
  const [map, setMap] = useState(null);
  const [pins, setPins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const { lat, lng, zoom } = getRandomLocation();
    const map = L.map('leaflet-map', {
      center: [lat, lng],
      zoom,
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
      layers: [
        L.tileLayer(
          'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
          {
            attribution:
              '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/attribution/">CARTO</a>',
          }
        ),
      ],
    });
    map.on('locationfound', () => setIsLocating(false));
    map.on('locationerror', () => setIsLocating(false));
    setMap(map);

    return () => {
      map.remove();
      setMap(null);
    };
  }, []);

  useEffect(() => {
    if (map && pins.length) {
      let markers = [];
      pins.forEach(pin => {
        const marker = L.marker([pin.lat, pin.lng])
          .addTo(map)
          .bindPopup(`<b>${pin.title}</b><br />${pin.description}`, {
            maxWidth: 180,
            autoPanPaddingTopLeft: [90, 10],
            autoPanPaddingBottomRight: [10, 10],
          });

        pin.marker = marker;
        markers.push(marker);
      });
      map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [80, 80] });
    }
  }, [map, pins]);

  async function loadPins() {
    setIsLoading(true);
    try {
      setPins(await getPins());
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  function clearPins() {
    pins.forEach(({ marker }) => map.removeLayer(marker));
    setPins([]);
  }

  function locate() {
    setIsLocating(true);
    map.locate({ setView: true });
  }

  function showPin(pinId) {
    const pin = pins.find(pin => pin.id === pinId);
    map.setView([pin.lat, pin.lng], 16, { animate: false });
    pin.marker.openPopup();
  }

  return (
    <MapContext.Provider
      value={{ map, pins, isLoading, isLocating, loadPins, clearPins, locate, showPin }}
    >
      <LeafletMap id="leaflet-map" />
      <ContentWrapper>{children}</ContentWrapper>
    </MapContext.Provider>
  );
}

export default Map;
