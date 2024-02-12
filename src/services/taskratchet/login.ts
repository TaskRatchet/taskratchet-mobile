import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeApp} from 'firebase/app';
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

import {firebaseConfig} from '../firebaseConfig';
import fetch1 from './fetch1';
import {publishSession} from './sessions';

let _auth: Auth;
let _listenerSet = false;

function _getAuth() {
  if (!_auth) {
    const app = initializeApp(firebaseConfig);
    _auth = getAuth(app);
  }

  if (!_listenerSet) {
    onAuthStateChanged(_auth, user => {
      if (user) {
        RNSecureKeyStore.set('authState', JSON.stringify(user), {
          accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
        }).catch(error => {
          console.error(`Error setting authState: ${String(error)}`);
        });
      } else {
        RNSecureKeyStore.get('authState')
          .then(() => {
            RNSecureKeyStore.remove('authState').catch(error => {
              console.error(`Error removing authState: ${String(error)}`);
            });
          })
          .catch(() => {
            // No authState is set. No action needed.
          });
      }
    });
    _listenerSet = true;
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
    await RNSecureKeyStore.set('token', token, {
      accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    });
  } catch (error) {
    console.error(`Error setting token: ${String(error)}`);
  }

  await AsyncStorage.setItem('email', email);

  const cred = await signInWithEmailAndPassword(_getAuth(), email, password);

  try {
    await RNSecureKeyStore.set('firebase_token', await cred.user.getIdToken(), {
      accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    });
  } catch (error) {
    console.error(`Error setting firebase token: ${String(error)}`);
  }

  await publishSession();

  return true;
}
