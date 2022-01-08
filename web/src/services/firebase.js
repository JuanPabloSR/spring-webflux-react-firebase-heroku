
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/database";

firebase.initializeApp({
  apiKey: "AIzaSyDN8gM3Gn9Bd3KPkwKzOBJ7-s6WB1gD-v0",
    authDomain: "preguntas-d8bfd.firebaseapp.com",
    projectId: "preguntas-d8bfd",
    storageBucket: "preguntas-d8bfd.appspot.com",
    messagingSenderId: "797912523803",
    appId: "1:797912523803:web:47b4b4c11c74f9f50b04be",
    measurementId: "G-Y8F1SEQBRB"
  });  
  export const auth = firebase.auth(); 
  export const GoogleProvider = () =>  new firebase.auth.GoogleAuthProvider();