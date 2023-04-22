import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBi6Z4oaaXUNvX7JXUBoaTATMam2QRqo7s",
    authDomain: "shrinkly-da127.firebaseapp.com",
    projectId: "shrinkly-da127",
    storageBucket: "shrinkly-da127.appspot.com",
    messagingSenderId: "1034633186872",
    appId: "1:1034633186872:web:95b78ec999b0fcdc83e0cd"
};

const app = firebase.initializeApp(firebaseConfig)
const db = app.firestore()

export default db;