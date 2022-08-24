//importar modulos de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification,
  signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js"
import {getFirestore,collection, addDoc, getDocs,orderBy,Timestamp,deleteDoc,updateDoc} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js"

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC8vBCCnI6bXjAa3ZOAVJd5rFv1Doeg3c8",
    authDomain: "red-social-ninverse.firebaseapp.com",
    projectId: "red-social-ninverse",
    storageBucket: "red-social-ninverse.appspot.com",
    messagingSenderId: "985322603240",
    appId: "1:985322603240:web:2334b8f836fa9a2e5c3f5d"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
  
//auth
//const provider = new firebase.auth.GoogleAuthProvider();
const auth = getAuth();

//registrarse con correo electronico
function newUser(){
  let botonSubmit = document.getElementById('submitBtn')
  botonSubmit.addEventListener('click', function (event) {
  event.preventDefault()
    let mailInput = document.getElementById("mailInput").value;
    let passInput = document.getElementById("passInput").value;
    createUserWithEmailAndPassword(auth, mailInput, passInput)
      .then((userCredential) => {
        window.location.assign("/welcome")
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
        
        //alerts según error
        switch (errorCode) {
          case 'auth/email-already-in-use':
            alert('Este correo ya está en uso')
            break;
          case 'auth/missing-email':
            alert('Por favor completar su correo')
            break;
          case 'auth/invalid-email':
            alert('Correo inválido')
            break;
          case 'auth/weak-password':
            alert('Su contraseña debe tener al menos 6 caracteres alfanuméricos')
            break;
           case 'auth/internal-error':
            alert('No sabemos, tamos xikitas')
            break;
          }
      });
  event.stopImmediatePropagation()})
}

//login con cualquier correo
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });


//firestore
const db = getFirestore(app);



export{newUser}