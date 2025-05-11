
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJ_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_ID
};
// Initialize Firebase
console.log(firebaseConfig)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}
