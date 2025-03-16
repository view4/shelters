import { initializeApp } from "firebase/app";
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    getIdToken,
    getAuth
  } from "firebase/auth";
  

const app = initializeApp({
    apiKey: process.env.REACT_APP_AUTHENTICATION_API_KEY,
    authDomain: process.env.REACT_APP_AUTHENTICATION_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_AUTHENTICATION_PROJECT_ID,
    storageBucket: process.env.REACT_APP_AUTHENTICATION_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_AUTHENTICATION_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_AUTHENTICATION_APP_ID,
    measurementId: process.env.REACT_APP_AUTHENTICATION_MEASUREMENT_ID

});

export const auth = getAuth(app);

export const getToken = (user) => user ? getIdToken(user) : null;
export const onAuthStateChange = (callback) => onAuthStateChanged(auth, callback);
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);