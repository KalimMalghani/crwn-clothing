import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyALJECAGVmDAo969MPNpYTWbbygAntwlVU",
  authDomain: "crwn-db-8be45.firebaseapp.com",
  databaseURL: "https://crwn-db-8be45.firebaseio.com",
  projectId: "crwn-db-8be45",
  storageBucket: "crwn-db-8be45.appspot.com",
  messagingSenderId: "974728198880",
  appId: "1:974728198880:web:c4033d786c2d09d1a6ee85",
  measurementId: "G-CWY3SBB248"
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
