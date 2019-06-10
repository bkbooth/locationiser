const L = {
  map: jest.fn(() => ({
    setView: jest.fn(),
  })),
  tileLayer: jest.fn(),
};

export default L;
