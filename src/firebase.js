// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyCvgjDwx-IkME7BzVSpEgp98H4c4vyIj1o",

    authDomain: "test-career-workshop.firebaseapp.com",

    projectId: "test-career-workshop",

    storageBucket: "test-career-workshop.appspot.com",

    messagingSenderId: "594503463185",

    appId: "1:594503463185:web:93503c0bcd8d0d6a88dcb0",

    measurementId: "G-TYTNC16RWV"

}


// Initialize Firebase

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }