jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('token')),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(),
}));
