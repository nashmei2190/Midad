
// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCN7fWuPcV6avjG_1xoCAHoMjK0HHxAvTw",
  authDomain: "miidad.firebaseapp.com",
  projectId: "miidad",
  storageBucket: "miidad.firebasestorage.app",
  messagingSenderId: "51253369854",
  appId: "1:51253369854:web:9377f4e585e5d997c7beaf",
  measurementId: "G-H8VPS5HSX9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
