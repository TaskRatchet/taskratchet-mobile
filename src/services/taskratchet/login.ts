import {publishSession} from './sessions';
import fetch1 from './fetch1';

export async function login(email: string, password: string): Promise<boolean> {
  const res = await fetch1('account/login', false, 'POST', {
    email,
    password,
  });

  if (!res.ok) return false;

  const token = await res.text();

  window.localStorage.setItem('token', token);
  window.localStorage.setItem('email', email);

  publishSession();

  return true;
}
