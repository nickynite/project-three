import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBkUM9IksyKGP-ko7GWdtpDjfgkJwwCWls",
    authDomain: "worry-wart.firebaseapp.com",
    projectId: "worry-wart",
    storageBucket: "worry-wart.appspot.com",
    messagingSenderId: "212264626560",
    appId: "1:212264626560:web:0ffd01902a1da42b113965"
};

// initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;