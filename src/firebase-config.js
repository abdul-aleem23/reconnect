// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//Firestore database
import { getFirestore } from "firebase/firestore"

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY
const authDomain = import.meta.env.VITE_REACT_APP_AUTH_DOMAIN
const projectId = import.meta.env.VITE_REACT_APP_PROJECT_ID
const storageBucket = import.meta.env.VITE_REACT_APP_STORAGE_BUCKET
const messagingSenderId = import.meta.env.VITE_REACT_APP_MESSAGE_SENDER_ID
const appId = import.meta.env.VITE_REACT_APP_APP_ID

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);