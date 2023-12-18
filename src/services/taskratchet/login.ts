import {publishSession} from './sessions';
import fetch1 from './fetch1';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function login(email: string, password: string): Promise<boolean> {
  const res = await fetch1('account/login', false, 'POST', {
    email,
    password,
  });

  if (!res.ok) return false;

  const token = await res.text();

  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('email', email);

  publishSession();

  return true;
}
