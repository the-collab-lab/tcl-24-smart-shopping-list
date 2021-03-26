// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
    apiKey: "AIzaSyBiGTyF01ZsVHAyvBv9GidY14qjHFo0I64",
    authDomain: "tcl-24-shopping-list.firebaseapp.com",
    projectId: "tcl-24-shopping-list",
    storageBucket: "tcl-24-shopping-list.appspot.com",
    messagingSenderId: "545115595707",
    appId: "1:545115595707:web:329d1e8bd51d53e7c75a9e"

};

let fb = firebase.initializeApp(firebaseConfig);

export { fb };
