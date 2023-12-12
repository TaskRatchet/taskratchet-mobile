import {login} from './login';
import {expect, it, describe, vi, beforeEach} from 'vitest';
import {signInWithEmailAndPassword} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchMock from 'jest-fetch-mock';

vi.mock('firebase/auth');

describe('login', () => {
  beforeEach(() => {
    vi.mocked(signInWithEmailAndPassword).mockResolvedValue({
      user: {
        getIdToken: () => Promise.resolve('token'),
      },
    } as any);
  });

  it('stores session token on successful login', async () => {
    fetchMock.mockResponse('token');

    await login('test', 'test');

    expect(AsyncStorage.getItem('token')).toBe('token');
  });

  it('stores session email on successful login', async () => {
    fetchMock.mockResponse('token');

    await login('test', 'test');

    expect(AsyncStorage.getItem('email')).toBe('test');
  });
});
