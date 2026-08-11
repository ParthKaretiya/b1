import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClME7qnDWG1gpXrP3UexAj3nGuOnHceCA",
  authDomain: "bhavy-3cf84.firebaseapp.com",
  projectId: "bhavy-3cf84",
  storageBucket: "bhavy-3cf84.firebasestorage.app",
  messagingSenderId: "470910429926",
  appId: "1:470910429926:web:fde8a81405c300eca62927",
  measurementId: "G-FCGXY615SV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
