import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { createPin, getPins } from 'api/pins';
import { getRandomLocation } from 'components/Map/locations';
import { MapContext } from 'components/Map/MapContext';
import * as S from './styles';

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

function buildPopupContent(pin) {
  return `
    <div class="leaflet-popup-title">${pin.title}</div>
    <div class="leaflet-popup-description">${pin.description}</div>
  `;
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

  function addMarkerForPin(pin) {
    pin.marker = L.marker([pin.lat, pin.lng], { title: pin.title })
      .addTo(map)
      .bindPopup(buildPopupContent(pin), {
        maxWidth: 180,
        autoPanPaddingTopLeft: [90, 10],
        autoPanPaddingBottomRight: [10, 10],
      });
  }

  useEffect(() => {
    if (map && pins.length) {
      pins.forEach(addMarkerForPin);
    }
  }, [map, pins]); // eslint-disable-line

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

  async function addPin({ lat, lng, title, description }) {
    const pin = await createPin({ lat, lng, title, description });
    addMarkerForPin(pin);
    setPins([pin, ...pins]);
  }

  return (
    <MapContext.Provider
      value={{ map, pins, isLoading, isLocating, loadPins, clearPins, locate, showPin, addPin }}
    >
      <S.LeafletMap id="leaflet-map" />
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </MapContext.Provider>
  );
}

export default Map;
export { getRandomLocation } from './locations';
export { useMap } from './MapContext';
