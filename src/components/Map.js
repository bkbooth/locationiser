import React, { createContext, useContext, useEffect, useState } from 'react';
import L from 'leaflet';
import styled from 'styled-components/macro';

const HEADER_HEIGHT = '80px';

const LeafletMap = styled.div`
  height: calc(100% - ${HEADER_HEIGHT});
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: ${HEADER_HEIGHT};
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
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

export const MapContext = createContext(null);

export function useMap() {
  return useContext(MapContext);
}

function Map({ children }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const { lat, lng, zoom } = getRandomLocation();
    setMap(
      L.map('leaflet-map', {
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
      })
    );
  }, []);

  return (
    <MapContext.Provider value={map}>
      <LeafletMap id="leaflet-map" />
      <ContentWrapper>{children}</ContentWrapper>
    </MapContext.Provider>
  );
}

export default Map;
