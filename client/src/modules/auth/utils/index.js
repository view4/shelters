import { initializeApp } from "firebase/app";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getIdToken,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
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

export const getUser = () => auth.currentUser;

export const providerBasedAuthentication = async (provider) => {
  switch (provider) {
    case "google":
      try {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        return user;
      } catch (error) {
        if (error.code === "auth/popup-closed-by-user") {
          throw new Error("Popup closed by user");
        }
        if (error.code === "auth/popup-blocked") {
          const { user } = await signInWithRedirect(auth, provider);
          return user;

        }
        console.log(error);
        throw new Error("Failed to login with provider");
      }


    default:
      throw new Error("Invalid provider");
  }
}