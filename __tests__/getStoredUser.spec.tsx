import 'react-native';
import getStoredUser from '../src/utils/getStoredUser';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';
import {get} from 'http';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(JSON.stringify('me'))),
}));

// Import the mocked AsyncStorage
const AsyncStorage = jest.requireMock(
  '@react-native-async-storage/async-storage',
);

describe('getStoredUser', () => {
  it('Calls AsyncStorage.getItem', async () => {
    await getStoredUser();

    expect(AsyncStorage.getItem).toBeCalledWith('me');
  });
  it('Gets User From AsyncStorage', async () => {
    await expect(getStoredUser()).resolves.toBe('me');
  });
});
