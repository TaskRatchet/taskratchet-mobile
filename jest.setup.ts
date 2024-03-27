import '@testing-library/jest-native/extend-expect';

jest.mock('./src/firebase/localGetAuth');
jest.mock('react-native-screens');

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(() => Promise.resolve('token')),
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  auth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({user: {uid: 'testUid'}}),
    ),
  })),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({user: {getIdToken: () => Promise.resolve('token')}}),
  ),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
