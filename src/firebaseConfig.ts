import { getApp, getApps, initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGR5_lnJUNL7DzXypSUwLCVGr6j7GhUu8",
  authDomain: "carevia-71376.firebaseapp.com",
  projectId: "carevia-71376",
  storageBucket: "carevia-71376.firebasestorage.app",
  messagingSenderId: "135193978657",
  appId: "1:135193978657:web:973c0537624572e4e0c060",
};

export const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const db = getFirestore(app);

if (__DEV__) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}