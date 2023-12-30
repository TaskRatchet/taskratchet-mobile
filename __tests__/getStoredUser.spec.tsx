import 'react-native';

import {expect, it} from '@jest/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';

import getStoredUser from '../src/utils/getStoredUser';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(JSON.stringify('me'))),
}));

describe('getStoredUser', () => {
  it('Calls AsyncStorage.getItem', async () => {
    await getStoredUser();

    expect(AsyncStorage.getItem).toBeCalledWith('me');
  });
  it('Gets User From AsyncStorage', async () => {
    await expect(getStoredUser()).resolves.toBe('me');
  });
});
