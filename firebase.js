import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClw-k486vPhLEGVkbbc6JkKa3ryD7-B4s",
  authDomain: "fyp-hashim.firebaseapp.com",
  databaseURL: "https://fyp-hashim-default-rtdb.firebaseio.com",
  projectId: "fyp-hashim",
  storageBucket: "fyp-hashim.firebasestorage.app",
  messagingSenderId: "399149764399",
  appId: "1:399149764399:web:3bd5ee578b3923744a9bda",
  measurementId: "G-HV3LE3MNZK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth , db , app };
