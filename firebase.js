import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBRdsJSI_81vRazHP7fNbFYJepKIRi3uPg",
    authDomain: "ichat-7a569.firebaseapp.com",
    projectId: "ichat-7a569",
    storageBucket: "ichat-7a569.appspot.com",
    messagingSenderId: "417198989597",
    appId: "1:417198989597:web:5e3656be71d3cd57d881f4"
  };

const app = !firebase.apps.length
? firebase.initializeApp(firebaseConfig)
: firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
