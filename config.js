import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyB5ZZ-8pGGBGF7up_o-KDt_hkTWNfY6aYM",
  authDomain: "barter-system-app-47ca0.firebaseapp.com",
  projectId: "barter-system-app-47ca0",
  storageBucket: "barter-system-app-47ca0.appspot.com",
  messagingSenderId: "411176530189",
  appId: "1:411176530189:web:86c1043a36b3226e654044",
  measurementId: "G-C2JZQ985F2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
