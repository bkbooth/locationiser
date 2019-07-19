import L from 'leaflet';

const FaIcon = L.Icon.extend({
  options: {
    iconSize: [34, 48],
    iconAnchor: [17, 48],
    popupAnchor: [0, -36],
    shadowUrl: `${process.env.PUBLIC_URL}/assets/map-marker-shadow.png`,
    shadowSize: [60, 48],
    shadowAnchor: [17, 48],
  },
});

export const defaultIcon = new FaIcon({
  iconUrl: `${process.env.PUBLIC_URL}/assets/map-marker-alt.svg`,
  className: 'leaflet-default-icon',
});

export const newPinIcon = new FaIcon({
  iconUrl: `${process.env.PUBLIC_URL}/assets/map-marker-plus.svg`,
  className: 'leaflet-new-pin-icon',
});
