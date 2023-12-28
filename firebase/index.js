// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc,getDocs,updateDoc, doc, deleteDoc} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwpjkoLYj67GA3-N3U1Dg_JujfFRFTVlA",
  authDomain: "sample-e4620.firebaseapp.com",
  projectId: "sample-e4620",
  storageBucket: "sample-e4620.appspot.com",
  messagingSenderId: "259291399844",
  appId: "1:259291399844:web:b10bf98ac3f6b19de54831"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {app, db, getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc}