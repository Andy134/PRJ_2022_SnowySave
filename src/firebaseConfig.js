import { initializeApp } from 'firebase/app';
import {
  getAuth
} from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCq5r47a5Wu5dWp87adPbA0ifPnpuIaj-c",
  authDomain: "snowysave-5228e.firebaseapp.com",
  projectId: "snowysave-5228e",
  storageBucket: "snowysave-5228e.appspot.com",
  messagingSenderId: "864955101872",
  appId: "1:864955101872:web:06aad4fbb3b6294ded4175",
  measurementId: "G-ZYLBQRY8V9"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  auth,
  db,
};
