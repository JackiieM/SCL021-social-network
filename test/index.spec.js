// importamos la funcion que vamos a testear
import {newUser} from '../src/firebase.js'
//import { newUser, newGoogleUser, logIn, logInGoogle, postData, postDash, logOut } from '../src/firebase.js'
//import { readURL } from "./functions/functionsAnyMail.js"
//import { identifyUser } from "../functions/functionsWelcome.js";
//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
//import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js"

//probar autenticacion
// jest.mock("https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js", () => {
//   return {
//     auth: jest.fn().mockReturnThis(),
//     logIn: jest.fn(),
//   };
// })
// describe('')
const USERS = [
  {
    email: "test@elcorreo.it",
    password: "123456",
  },
];

global.firebase = {
  auth: () => {
    return {
      createUserWithEmailAndPassword: (email, password) => {
        const user = USERS.find((user) => user.email === email);
        if (user) {
          if (user.password === password) {
            return Promise.resolve({ user });
          } else if(user.password.length < 6) {
            return Promise.reject({ code: 'auth/weak-password' });
          } 
        } else {
          return Promise.reject({ code: 'auth/missing-email' });
        }
      },
    };
  },
};
describe("newUser", () => {
  it("Esperamos un error si la contraseña tiene menos de 6 caracteres", () => {
    return signin("testing@google.com", "ab12").catch((error) => {
      expect(error).toBe('auth/weak-password');
    });
  });

});
