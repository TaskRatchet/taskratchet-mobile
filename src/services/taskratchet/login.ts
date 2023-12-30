import AsyncStorage from '@react-native-async-storage/async-storage';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

import fetch1 from './fetch1';
import {publishSession} from './sessions';

export async function login(email: string, password: string): Promise<boolean> {
  const res = await fetch1('account/login', false, 'POST', {
    email,
    password,
  });

  if (!res.ok) {
    return false;
  }

  const token = await res.text();

  try {
    await RNSecureKeyStore.set('token', token, {
      accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    });
  } catch (error) {
    console.error(`Error setting token: ${String(error)}`);
  }

  await AsyncStorage.setItem('email', email);

  await publishSession();

  return true;
}
