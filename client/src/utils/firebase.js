// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF4HwSEpqS1e8XHRg8S4omGzXjhVW4dL0",
  authDomain: "mystyle-33b1c.firebaseapp.com",
  projectId: "mystyle-33b1c",
  storageBucket: "mystyle-33b1c.appspot.com",
  messagingSenderId: "109829470130",
  appId: "1:109829470130:web:b04d66cc7ff28fc4cbd6ab",
  measurementId: "G-2NMGHGS1RN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const storage = getStorage(app);