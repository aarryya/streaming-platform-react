import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  console.error("Firebase env vars are missing. Check your .env file or Docker build args.");
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signupWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const logout = () => signOut(auth);
