// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAIfAnpUEAFDYpXVYHKam2pWhKNdugst8E',
  authDomain: 'ad-blinkers.firebaseapp.com',
  projectId: 'ad-blinkers',
  storageBucket: 'ad-blinkers.appspot.com',
  messagingSenderId: '515088926385',
  appId: '1:515088926385:web:2a9fd91f1789002d8f4490',
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  // If user data does not exist
  if (!userSnapshot.exists()) {
    // get data from userAuth
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      // create /set data fromuserAuth in collection
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  // If data exists simple
  // return userDocRef
  return userDocRef;
};
