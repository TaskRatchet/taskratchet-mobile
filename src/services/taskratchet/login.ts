import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeApp} from 'firebase/app';
import {Auth, getAuth, signInWithEmailAndPassword} from 'firebase/auth';

import {firebaseConfig} from '../firebaseConfig';
import fetch1 from './fetch1';
import {publishSession} from './sessions';
import * as SecureStore from 'expo-secure-store';

let _auth: Auth;

function _getAuth() {
  if (!_auth) {
    const app = initializeApp(firebaseConfig);
    _auth = getAuth(app);
  }

  return _auth;
}

export async function login(email: string, password: string): Promise<boolean> {
  const res = await fetch1('account/login', false, 'POST', {
    email,
    password,
  });

  console.log('login called');

  if (!res.ok) {
    return false;
  }

  const token = await res.text();

  try {
    await SecureStore.setItemAsync('token', token);
    console.log('token set');
  } catch (error) {
    console.error(`Error setting token: ${String(error)}`);
  }

  await AsyncStorage.setItem('email', email);
  console.log('email set');

  const cred = await signInWithEmailAndPassword(_getAuth(), email, password);

  try {
    await SecureStore.setItemAsync(
      'firebase_token',
      await cred.user.getIdToken(),
    );
    console.log('firebase token set');
  } catch (error) {
    console.error(`Error setting firebase token: ${String(error)}`);
  }

  await publishSession();

  return true;
}
