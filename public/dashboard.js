// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Feedback Elements
const satisfiedButton = document.getElementById('satisfied');
const unsatisfiedButton = document.getElementById('unsatisfied');
const statsContainer = document.getElementById('stats');
const logoutButton = document.getElementById('logout');

// Logout
logoutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  }).catch(error => {
    console.error('Error logging out:', error);
  });
});

// Update feedback count in Firestore
const updateFeedbackCount = async (feedbackType) => {
  const docRef = doc(db, 'feedback', 'stats');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const currentData = docSnap.data();
    if (feedbackType in currentData) {
      currentData[feedbackType] += 1;
    } else {
      currentData[feedbackType] = 1;
    }
    await updateDoc(docRef, currentData);
  } else {
    await setDoc(docRef, { [feedbackType]: 1 });
  }

  loadStats();
};

// Load stats from Firestore
const loadStats = async () => {
  const docRef = doc(db, 'feedback', 'stats');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    statsContainer.innerHTML = `
      <h3>Feedback Statistics</h3>
      <p>Satisfied: ${data.satisfied || 0}</p>
      <p>Unsatisfied: ${data.unsatisfied || 0}</p>
    `;
  } else {
    statsContainer.innerHTML = '<p>No feedback yet</p>';
  }
};

// Handle Feedback Buttons
satisfiedButton.addEventListener('click', () => {
  updateFeedbackCount('satisfied');
});

unsatisfiedButton.addEventListener('click', () => {
  updateFeedbackCount('unsatisfied');
});

// Load stats on page load
window.addEventListener('load', loadStats);
