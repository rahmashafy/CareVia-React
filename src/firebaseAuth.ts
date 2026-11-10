import {
    connectAuthEmulator,
    getAuth,
} from 'firebase/auth';

import { app } from './firebaseConfig';

export const auth = getAuth(app);

if (__DEV__) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}