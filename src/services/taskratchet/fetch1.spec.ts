import fetch1 from './fetch1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchMock from 'jest-fetch-mock';
import RNSecureKeyStore from 'react-native-secure-key-store';

jest.mock('react-native-secure-key-store', () => ({
  set: jest.fn(() => Promise.resolve()),
  get: jest.fn(() => Promise.resolve('token')),
  ACCESSIBLE: {
    ALWAYS_THIS_DEVICE_ONLY: 'ALWAYS_THIS_DEVICE_ONLY',
  },
}));

describe('fetch1', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });
  it('uses SecureKeyStore token', async () => {
    fetchMock.mockResponse(JSON.stringify({}));

    const token = 'token';

    await RNSecureKeyStore.set('token', token);

    const url = 'https://example.com';
    await fetch1(url);

    expect(RNSecureKeyStore.get).toHaveBeenCalledWith('token'); // Check if RNSecureKeyStore.get was called with 'token'

    expect(fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        headers: {
          'X-Taskratchet-Token': token,
        },
      }),
    );
  });
});
