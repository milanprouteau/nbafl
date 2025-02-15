import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDy061-yNwzsi-r6Tcc524kXKojtevCWxo",
  authDomain: "nbafl-41240.firebaseapp.com",
  projectId: "nbafl-41240",
  storageBucket: "nbafl-41240.firebasestorage.app",
  messagingSenderId: "80970298099",
  appId: "1:80970298099:web:267d58548a98163142bd86",
  measurementId: "G-DFV29MCWVJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
