import secureStore from 'expo-secure-store';

import {API2_BASE} from './constants';
import {logout} from './logout';

const _trim = (s: string, c: string) => {
  if (c === ']') {
    c = '\\]';
  }
  if (c === '\\') {
    c = '\\\\';
  }
  return s.replace(new RegExp('^[' + c + ']+|[' + c + ']+$', 'g'), '');
};

export default async function fetch2(
  route: string,
  protected_ = false,
  method = 'GET',
  data: unknown = null,
): Promise<Response> {
  const token =
    ((await secureStore.getItemAsync('firebase_token')) as string) || '';
  const route_ = _trim(route, '/');

  if (protected_ && !token) {
    throw new Error('User not logged in');
  }

  // noinspection SpellCheckingInspection
  const response = await fetch(API2_BASE + route_, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 403) {
    await logout();
  }

  return response;
}
