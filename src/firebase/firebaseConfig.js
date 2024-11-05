import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChkn606O_R6qSunbhbwi5FuO1j-ZceTZg",
  authDomain: "exam-64674.firebaseapp.com",
  projectId: "exam-64674",
  storageBucket: "exam-64674.firebasestorage.app",
  messagingSenderId: "610252407184",
  appId: "1:610252407184:web:05e8a108583d3d2cdcb315",
  measurementId: "G-F2WP7E3102"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
