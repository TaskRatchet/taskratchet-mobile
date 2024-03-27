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

  if (!res.ok) {
    return false;
  }

  const token = await res.text();

  try {
    await SecureStore.setItemAsync('token', token);
  } catch (error) {
    console.error(`Error setting token: ${String(error)}`);
  }

  await AsyncStorage.setItem('email', email);

  const cred = await signInWithEmailAndPassword(_getAuth(), email, password);

  try {
    await SecureStore.setItemAsync(
      'firebase_token',
      await cred.user.getIdToken(),
    );
  } catch (error) {
    console.error(`Error setting firebase token: ${String(error)}`);
  }

  await publishSession();

  return true;
}
