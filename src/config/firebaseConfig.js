// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4rCQYItkQC-gaPC5T8zC713pdcVzCtMk",
  authDomain: "recipe-book-crud.firebaseapp.com",
  projectId: "recipe-book-crud",
  storageBucket: "recipe-book-crud.firebasestorage.app",
  messagingSenderId: "226515895086",
  appId: "1:226515895086:web:d8bca3b5336bce9dc770bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);