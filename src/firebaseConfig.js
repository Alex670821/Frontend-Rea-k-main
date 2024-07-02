// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGfQ_IH2sIl6Tx84U910zFMu3Owg1O5rc",
  authDomain: "authstream-ca4d8.firebaseapp.com",
  projectId: "authstream-ca4d8",
  storageBucket: "authstream-ca4d8.appspot.com",
  messagingSenderId: "468086070197",
  appId: "1:468086070197:web:15f36026a5df2a4710d7fc",
  measurementId: "G-XH8MMMWELC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
