import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuth, signOut} from 'firebase/auth';
import RNSecureKeyStore from 'react-native-secure-key-store';

import {publishSession} from './sessions';

export async function logout() {
  const auth = getAuth();
  await RNSecureKeyStore.remove('token');
  await RNSecureKeyStore.remove('firebase_token');
  await AsyncStorage.removeItem('email');
  await signOut(auth);
  await publishSession();
}
