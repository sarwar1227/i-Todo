import firebase from "firebase";
require('dotenv').config();

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyANnPzokx3SbRG9rrLlgJKT0djNo9P7JwA",
    authDomain: "i-todo-36d42.firebaseapp.com",
    projectId: "i-todo-36d42",
    storageBucket: "i-todo-36d42.appspot.com",
    messagingSenderId: "9972421907",
    appId: "1:9972421907:web:79c4243a7223aa2f15f6e6",
    measurementId: "G-8N9SPQNQ7N"
});

const db = firebaseApp.firestore();

export default db;