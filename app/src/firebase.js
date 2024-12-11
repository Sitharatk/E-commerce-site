import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "ecommerce-b39f7.firebaseapp.com",
    projectId: "ecommerce-b39f7",
    storageBucket: "ecommerce-b39f7.firebasestorage.app",
    messagingSenderId: "980530009861",
    appId: "1:980530009861:web:a6b85a4bb5c52b17cf896c",
    measurementId: "G-GSKLC046WC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
