import firebase from 'firebase'
import 'firebase/firebase-auth'
import 'firebase/storage'
require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyDyXgDuwBdWKSQ1LHZFnDqrcMq__6kx0cY",
    authDomain: "vue-shop-9ad44.firebaseapp.com",
    databaseURL: "https://vue-shop-9ad44.firebaseio.com",
    projectId: "vue-shop-9ad44",
    storageBucket: "vue-shop-9ad44.appspot.com",
    messagingSenderId: "4003022460",
    appId: "1:4003022460:web:ea675b0d426a7584d8abf9",
    measurementId: "G-LMJJGB75PY"
  };
  // Initialize Firebase
  
  export const fb =  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore(); 
  firebase.analytics();