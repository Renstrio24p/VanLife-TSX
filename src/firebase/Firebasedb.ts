import { initializeApp } from "firebase/app";
import {collection, getFirestore} from 'firebase/firestore/lite'

import { FirebaseTypes } from "../types/Firebase.types";

const firebaseConfig: FirebaseTypes = {
  apiKey: process.env.FIREBASE_SCRIM_API_KEY,
  authDomain: process.env.FIREBASE_SCRIM_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_SCRIM_PROJECT_ID,
  storageBucket: process.env.FIREBASE_SCRIM_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SCRIM_SENDER_ID,
  appId: process.env.FIREBASE_SCRIM_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const collectionofVansRef = collection(db,'vans')

