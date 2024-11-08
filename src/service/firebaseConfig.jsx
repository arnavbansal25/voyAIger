// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJoQnv7LzywHCl284XU3YehH1CyrNp7Z0",
  authDomain: "ai-travel-planner-4fe80.firebaseapp.com",
  projectId: "ai-travel-planner-4fe80",
  storageBucket: "ai-travel-planner-4fe80.firebasestorage.app",
  messagingSenderId: "981195641931",
  appId: "1:981195641931:web:54f21d73e28040e12829ce",
  measurementId: "G-HSZVP1GSRK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
