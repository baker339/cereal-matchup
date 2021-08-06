import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyCJbtsr8eOzDziidd0HPUlRZ6TAYtfshQw",
    authDomain: "cereal-matchup.firebaseapp.com",
    projectId: "cereal-matchup",
    storageBucket: "cereal-matchup.appspot.com",
    messagingSenderId: "672845698778",
    appId: "1:672845698778:web:1b23b77d49d15ea19177e3",
    measurementId: "G-RK3ELKGH85"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();