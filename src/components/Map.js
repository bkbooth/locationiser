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

export const defaultLocations = [
  { lat: -33.8617948, lng: 151.1765674, zoom: 13 }, // Sydney
  { lat: 51.5053257, lng: -0.1244318, zoom: 13 }, // London
  { lat: 40.6973611, lng: -74.0497223, zoom: 12 }, // New York
  { lat: 35.652501, lng: 139.719578, zoom: 12 }, // Tokyo
  { lat: 48.8588232, lng: 2.3295499, zoom: 14 }, // Paris
];

export function getRandomLocation() {
  return defaultLocations[Math.floor(Math.random() * defaultLocations.length)];
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
  markers: [],
  isLoading: false,
  isLocating: false,
  loadPins: null,
  clearPins: null,
  locate: null,
});

export function useMap() {
  return useContext(MapContext);
}

function Map({ children }) {
  const [map, setMap] = useState(null);
  const [pins, setPins] = useState([]);
  const [markers, setMarkers] = useState([]);
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
      const markers = pins.map(({ lat, lng }) => L.marker([lat, lng]).addTo(map));
      setMarkers(markers);
      map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [40, 40] });
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
    markers.forEach(marker => map.removeLayer(marker));
    setMarkers([]);
    setPins([]);
  }

  function locate() {
    setIsLocating(true);
    map.locate({ setView: true });
  }

  return (
    <MapContext.Provider
      value={{ map, pins, markers, isLoading, isLocating, loadPins, clearPins, locate }}
    >
      <LeafletMap id="leaflet-map" />
      <ContentWrapper>{children}</ContentWrapper>
    </MapContext.Provider>
  );
}

export default Map;
