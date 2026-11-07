import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

  // Firebase Console-la irundhu copy panna
  // unga actual configuration values inga add pannunga
  // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGR5_lnJUNL7DzXypSUwLCVGr6j7GhUu8",
  authDomain: "carevia-71376.firebaseapp.com",
  projectId: "carevia-71376",
  storageBucket: "carevia-71376.firebasestorage.app",
  messagingSenderId: "135193978657",
  appId: "1:135193978657:web:973c0537624572e4e0c060"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
console.log("Firebase initialized successfully:", app);

export const auth = getAuth(app);
export const db = getFirestore(app);