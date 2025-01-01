// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAWM5QmBwZhSjOtMnIc-MLLOP5p-YrZzg",
  authDomain: "expencesync.firebaseapp.com",
  projectId: "expencesync",
  storageBucket: "expencesync.firebasestorage.app",
  messagingSenderId: "163669232748",
  appId: "1:163669232748:web:d099ab459fd61b6e5bdc49",
  measurementId: "G-RTB0DEZ8WV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };