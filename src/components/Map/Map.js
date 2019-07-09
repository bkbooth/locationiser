import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import moment from 'moment';
import { getPins } from 'api/pins';
import CreatePin from './CreatePin';
import { getRandomLocation } from './locations';
import { defaultIcon } from './icons';
import { MapContext } from './MapContext';
import * as S from './Map.styles';

L.Marker.prototype.options.icon = defaultIcon;

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
  const createdAt = moment(pin.createdAt);
  return `
    <div class="leaflet-popup-title">${pin.title}</div>
    ${
      pin.description
        ? `<div class="leaflet-popup-description">
            ${pin.description.replace(/\n|\r|\r\n/g, '<br />')}</div>`
        : ''
    }
    <div class="leaflet-popup-date" title="${createdAt.format('LLL')}">${createdAt.fromNow()}</div>
  `;
}

function Map({ children }) {
  const [map, setMap] = useState(null);
  const [pins, setPins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isAddingPin, setIsAddingPin] = useState(false);

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
      })
      .on('click', () => map.setView([pin.lat, pin.lng], pin.zoom || 16, { animate: true }));
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
    map.closePopup();
    map.setView([pin.lat, pin.lng], pin.zoom || 16, { animate: true });
    setTimeout(() => pin.marker.openPopup(), 300);
  }

  function addPin() {
    setIsAddingPin(true);
  }

  function stopAddingPin() {
    setIsAddingPin(false);
  }

  function handleAddCreatedPin(pin) {
    addMarkerForPin(pin);
    pin.marker.openPopup();
    setPins([pin, ...pins]);
  }

  return (
    <MapContext.Provider
      value={{
        map,
        pins,
        isLoading,
        isLocating,
        isAddingPin,
        loadPins,
        clearPins,
        locate,
        showPin,
        addPin,
        stopAddingPin,
      }}
    >
      <S.LeafletMap id="leaflet-map" />
      <S.ContentWrapper>{children}</S.ContentWrapper>
      <CreatePin onSavePin={handleAddCreatedPin} />
    </MapContext.Provider>
  );
}

export default Map;
