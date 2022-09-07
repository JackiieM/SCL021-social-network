// importamos la funcion que vamos a testear
import firebase from '../src/firebase.js'
import { newUser, newGoogleUser, logIn, logInGoogle, postData, postDash, logOut } from '../src/firebase.js'
import { readURL } from "./functions/functionsAnyMail.js"
import { identifyUser } from "../functions/functionsWelcome.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification,
  signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js"

//probar autenticacion
// jest.mock("https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js", () => {
//   return {
//     auth: jest.fn().mockReturnThis(),
//     logIn: jest.fn(),
//   };
// })
// describe('')



