import fetch1 from './fetch1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchMock from 'jest-fetch-mock';

describe('fetch1', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });
  it('uses localStorage token', async () => {
    fetchMock.mockResponse(JSON.stringify({}));

    const token = 'token';

    await AsyncStorage.setItem('token', token);

    const url = 'https://example.com';
    await fetch1(url);

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
