// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDE3Ihy-ueslFb56Qlum0Tov69vSv1bFtM",
    authDomain: "testserieser.firebaseapp.com",
    databaseURL: "https://testserieser-default-rtdb.firebaseio.com",
    projectId: "testserieser",
    storageBucket: "testserieser.firebasestorage.app",
    messagingSenderId: "653674112374",
    appId: "1:653674112374:web:d57c30674a152c57970657",
    measurementId: "G-TMC9906285"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
auth.languageCode = 'en'; // or 'hi', 'it', etc.

const database = getDatabase(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

// Set up reCAPTCHA verifier
const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container', {
            size: 'invisible',
            callback: (response) => {
                console.log('reCAPTCHA Verified ✅');
            },
        },
        auth
    );
};

export { app, auth, database, firestore, analytics, setUpRecaptcha };