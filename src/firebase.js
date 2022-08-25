// import firebase from "firebase";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBAdAyzKiD7B0CdDAIpqR7m-kzhswAGfVU",
  authDomain: "chat-49988.firebaseapp.com",
  projectId: "chat-49988",
  storageBucket: "chat-49988.appspot.com",
  messagingSenderId: "975957380652",  
  appId: "1:975957380652:web:ecd2db5abe8ff24074cb89",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// const db = app.firestore();

const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };
export default db;
