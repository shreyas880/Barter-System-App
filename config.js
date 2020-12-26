import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBpK1uV-odwaF7LZaspjK67yYlSrTiHPcQ",
    authDomain: "wireless-library-app-4c1e8.firebaseapp.com",
    databaseURL: "https://wireless-library-app-4c1e8.firebaseio.com",
    projectId: "wireless-library-app-4c1e8",
    storageBucket: "wireless-library-app-4c1e8.appspot.com",
    messagingSenderId: "932616623890",
    appId: "1:932616623890:web:8a32e367f35cbe2c8945cb"
  };

  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
