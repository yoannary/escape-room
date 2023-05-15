// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtiVM25srrupA7qLh5Cf2ZRnQEWLsiOIg",
  authDomain: "escape-room-ay.firebaseapp.com",
  projectId: "escape-room-ay",
  storageBucket: "escape-room-ay.appspot.com",
  messagingSenderId: "63290097075",
  appId: "1:63290097075:web:791dd7cde8627900939fc6",
  measurementId: "G-BNSVHXSY6V",
  databaseURL: 'https://escape-room-ay-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);
export const storage = getStorage(app);