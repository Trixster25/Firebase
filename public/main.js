// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKtFySD_BrZ8NdFOuGWBR7f5KRBhsX4GE",
    authDomain: "admin-side-b2f77.firebaseapp.com",
    projectId: "admin-side-b2f77",
    storageBucket: "admin-side-b2f77.appspot.com",
    messagingSenderId: "904205368217",
    appId: "1:904205368217:web:a9400a80744be949ecb108",
    measurementId: "G-VQNFRG643K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Login form
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Error signing in:', error);
        });
});
