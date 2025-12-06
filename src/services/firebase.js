import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-3ed6c.firebaseapp.com",
  projectId: "reactchat-3ed6c",
  storageBucket: "reactchat-3ed6c.firebasestorage.app",
  messagingSenderId: "211457729954",
  appId: "1:211457729954:web:4a8b577a65847614743efb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()