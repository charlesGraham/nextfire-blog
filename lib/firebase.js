import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA8QzrPjQh4l_2OnvDfAMMJaVFI70hOAkY",
    authDomain: "nextfire-blog-34937.firebaseapp.com",
    projectId: "nextfire-blog-34937",
    storageBucket: "nextfire-blog-34937.appspot.com",
    messagingSenderId: "757568075661",
    appId: "1:757568075661:web:212e1378e5797fb059efc4"
  };

  //initialize firebase app
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    } else {
        firebase.app();
    }


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();
  export const provider = new firebase.auth.GoogleAuthProvider();