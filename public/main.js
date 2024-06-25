// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";

// Firebase configuration
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

// Auth Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login');
const signupButton = document.getElementById('signup');
const authError = document.getElementById('auth-error');

// Login
loginButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      authError.textContent = error.message;
    });
});

// Sign Up
signupButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      authError.textContent = error.message;
    });
});

// Redirect to dashboard if already logged in
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});
