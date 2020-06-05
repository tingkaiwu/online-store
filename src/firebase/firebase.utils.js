import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDAEZc1kqsemeJGSAtMIQHUUDAN7yNi1ug",
  authDomain: "online-store-c2889.firebaseapp.com",
  databaseURL: "https://online-store-c2889.firebaseio.com",
  projectId: "online-store-c2889",
  storageBucket: "online-store-c2889.appspot.com",
  messagingSenderId: "184150331361",
  appId: "1:184150331361:web:1c874230b298b78ba9cca0",
  measurementId: "G-84EFCT18QG"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
