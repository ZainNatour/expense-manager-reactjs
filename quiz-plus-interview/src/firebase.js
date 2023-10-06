// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBimf-yI-L0QQdkCpFi0-vWMs9lNcxVr04",
  authDomain: "expense-manager-1c6af.firebaseapp.com",
  projectId: "expense-manager-1c6af",
  storageBucket: "expense-manager-1c6af.appspot.com",
  messagingSenderId: "166592439459",
  appId: "1:166592439459:web:127b9badc89338bc4fcb16",
  measurementId: "G-L8PVVYQ7R6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
// const analytics = getAnalytics(app);
export { app, firestore };
