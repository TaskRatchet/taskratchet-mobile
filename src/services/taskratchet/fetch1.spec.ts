import fetchMock from 'jest-fetch-mock';
import * as SecureStore from 'expo-secure-store';

import fetch1 from './fetch1';

describe('fetch1', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });
  it('uses SecureStore token', async () => {
    const response = await fetch1('route', true, 'GET');

    expect(response).toBeTruthy();
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('token');
  });
});
