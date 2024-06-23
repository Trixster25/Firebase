// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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

// Check if user is authenticated
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Fetch and display statistics
        const statsRef = doc(db, 'feedback', 'stats');
        getDoc(statsRef).then((docSnap) => {
            if (docSnap.exists()) {
                document.getElementById('satisfied-count').textContent = docSnap.data().satisfied;
                document.getElementById('unsatisfied-count').textContent = docSnap.data().unsatisfied;
            }
        }).catch((error) => {
            console.error('Error fetching statistics:', error);
        });
    } else {
        window.location.href = 'index.html';
    }
});

// Logout button
document.getElementById('logout').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
});
