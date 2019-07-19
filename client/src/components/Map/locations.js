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
