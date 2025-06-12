/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithCustomToken } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import {
  setPersistence,
  signInWithPopup,
  browserLocalPersistence,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_mQv5vvtKtv3ZTV_JLPAwxH4o71M0Ibo",
  authDomain: "ekalavya-theananta.firebaseapp.com",
  projectId: "ekalavya-theananta",
  storageBucket: "ekalavya-theananta.firebasestorage.app",
  messagingSenderId: "233530770064",
  appId: "1:233530770064:web:7064e809e7465ba7cfce15",
  measurementId: "G-JHEB2VTD1N",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.useDeviceLanguage();
(async () => {
  await setPersistence(auth, browserLocalPersistence);
})();

function signInWithEkalavyaCustomCredential(token, onSuccess, onFailure) {
  signInWithCustomToken(auth, token)
    .then((result) => {
      if (result === null) {
        alert("Error signing in");
        return;
      }
      const user = result.user;
      onSuccess(user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message;
      onFailure(errorMessage);
      // ...
    });
}

function signInWithGoogleAsPopup(onSuccess, onFailure) {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential === null) {
        alert("Error signing in");
        return;
      }
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      onSuccess(user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      onFailure(errorMessage);
      // ...
    });
}
const db = getFirestore(app);
const storage = getStorage(app);

export {
  db,
  auth,
  storage,
  signInWithGoogleAsPopup,
  signInWithEkalavyaCustomCredential,
};
