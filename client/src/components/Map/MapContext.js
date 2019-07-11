import { createContext, useContext } from 'react';

export const MapContext = createContext({
  map: null,
  pins: [],
  selectedPin: null,
  isLoading: false,
  isLocating: false,
  isAddingPin: false,
  loadPins: null,
  clearPins: null,
  locate: null,
  selectPin: null,
  showPin: null,
  addPin: null,
  stopAddingPin: null,
});

export function useMap() {
  return useContext(MapContext);
}
