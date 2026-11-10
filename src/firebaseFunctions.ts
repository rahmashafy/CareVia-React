import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { app } from './firebaseConfig';

export const functions = getFunctions(app, 'us-central1');

if (__DEV__) {
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}