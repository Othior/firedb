import firebase from 'firebase';
import 'firebase/firestore';

// Access db 
let firebaseConfig = {
    apiKey: "AIzaSyCcRk6_kDqTlEpMx1JGJbZzzgjwjdyIJl4",
    authDomain: "jamracker-36ec0.firebaseapp.com",
    databaseURL: "https://jamracker-36ec0.firebaseio.com",
    projectId: "jamracker-36ec0",
    storageBucket: "jamracker-36ec0.appspot.com",
    messagingSenderId: "59652357676",
    appId: "1:59652357676:web:04872a226de5d2fd101b89"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }