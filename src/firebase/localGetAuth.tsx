import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {firebaseConfig} from '../services/firebaseConfig';

export const initializeFirebase = () => {
  initializeApp(firebaseConfig);
  getAuth();
};
