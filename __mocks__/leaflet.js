const L = {
  map: jest.fn(() => ({
    setView: jest.fn(),
    addControl: jest.fn(),
    removeControl: jest.fn(),
    zoomControl: null,
    dragging: {
      enable: jest.fn(),
      disable: jest.fn(),
    },
    touchZoom: {
      enable: jest.fn(),
      disable: jest.fn(),
    },
    doubleClickZoom: {
      enable: jest.fn(),
      disable: jest.fn(),
    },
    scrollWheelZoom: {
      enable: jest.fn(),
      disable: jest.fn(),
    },
    boxZoom: {
      enable: jest.fn(),
      disable: jest.fn(),
    },
    keyboard: {
      enable: jest.fn(),
      disable: jest.fn(),
    },
    tap: {
      enable: jest.fn(),
      disable: jest.fn(),
    },
  })),
  tileLayer: jest.fn(),
  control: {
    zoom: jest.fn(() => Object.create()),
  },
};

export default L;
