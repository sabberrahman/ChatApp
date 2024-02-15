
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyADCfSFcgvoC8aEa1S4hQCyrbgmhPqH2nE",
  authDomain: "chatapp2-6fd49.firebaseapp.com",
  projectId: "chatapp2-6fd49",
  storageBucket: "chatapp2-6fd49.appspot.com",
  messagingSenderId: "739396041560",
  appId: "1:739396041560:web:418bc86bc07bb89cd0032d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();  
export const db = getFirestore(app);