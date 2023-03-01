import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: "todoapp-4f421.firebaseapp.com",
  projectId: "todoapp-4f421",
  storageBucket: "todoapp-4f421.appspot.com",
  messagingSenderId: "6998611342",
  appId: "1:6998611342:web:4f933a7bf1dc1eb28600df",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export default db;
