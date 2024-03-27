import * as SecureStore from 'expo-secure-store';

import {API1_BASE} from './constants';
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

export default async function fetch1(
  route: string,
  protected_: boolean,
  method = 'GET',
  data: unknown = null,
): Promise<Response> {
  let token: string | false;
  try {
    token = (await SecureStore.getItemAsync('token')) as string;
  } catch (error) {
    token = false;
  }

  const route_ = _trim(route, '/');

  if (protected_ && !token) {
    throw new Error('User not logged in');
  }

  // noinspection SpellCheckingInspection
  const response: Response = await fetch(API1_BASE + route_, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'X-Taskratchet-Token': token || '',
    },
  });

  if (response.status === 403) {
    await logout();
  }

  return response;
}
