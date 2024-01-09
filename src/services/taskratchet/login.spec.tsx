import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchMock from 'jest-fetch-mock';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

import fetch1 from './fetch1';
import {login} from './login';

jest.mock('react-native-secure-key-store', () => ({
  set: jest.fn(),
  get: jest.fn(() => Promise.resolve('token')),
  ACCESSIBLE: {
    ALWAYS_THIS_DEVICE_ONLY: 'ALWAYS_THIS_DEVICE_ONLY',
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('./fetch1', () => {
  return jest.fn(() => ({
    ok: true,
    text: () => Promise.resolve('token'),
  }));
});

describe('login', () => {
  it('Calls fetch1 with correct params', async () => {
    fetchMock.mockResponseOnce('token', {status: 200});

    await login('email', 'password');

    expect(fetch1).toHaveBeenCalledWith('account/login', false, 'POST', {
      email: 'email',
      password: 'password',
    });
  });

  it('stores session token on successful login', async () => {
    fetchMock.mockResponseOnce('token', {status: 200});

    const loginResult = await login('email', 'password');

    expect(loginResult).toBeTruthy();
    expect(RNSecureKeyStore.set).toHaveBeenCalledWith('token', 'token', {
      accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    });
  });

  it('stores session email on successful login', async () => {
    fetchMock.mockResponseOnce('token', {status: 200});

    const loginResult = await login('email', 'token');

    expect(loginResult).toBeTruthy();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('email', 'email');
  });
});
