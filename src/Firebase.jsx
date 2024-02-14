
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDtJUyx5381ZQa74SmEFha2YbPJvcxLZKA",
  authDomain: "chatapp-4f077.firebaseapp.com",
  projectId: "chatapp-4f077",
  storageBucket: "chatapp-4f077.appspot.com",
  messagingSenderId: "573770188704",
  appId: "1:573770188704:web:09c7ca1fd584b68fce46c5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 export const auth = getAuth();