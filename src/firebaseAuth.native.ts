import {
    getAuth,
    // @ts-expect-error Firebase React Native entry point exports this function.
    getReactNativePersistence,
    initializeAuth,
    type Auth,
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { app } from './firebaseConfig';

let auth: Auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  if ((error as { code?: string }).code !== 'auth/already-initialized') {
    throw error;
  }

  auth = getAuth(app);
}

export { auth };
