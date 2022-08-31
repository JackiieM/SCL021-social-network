//importar modulos de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification,
  signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js"
import {getFirestore, collection, addDoc, getDoc, getDocs,orderBy, Timestamp, deleteDoc, updateDoc, setDoc,query, where,limit} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js"

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
//firestore
const db = getFirestore(app);
  
//auth para cualquier correo electrónico y para Google. 
const auth = getAuth();
const provider = new GoogleAuthProvider();


//registrarse con correo electronico
function newUser(){
  let botonSubmit = document.getElementById('submitBtn')
  botonSubmit.addEventListener('click', function (event) {
  event.preventDefault()
    let mailInput = document.getElementById("mailInput").value;
    let passInput = document.getElementById("passInput").value;
    let nickInput=document.getElementById('nickInput').value
    let bioInput=document.getElementById('bioInput').value
    let birthInput = document.getElementById('birthInput').value
    let chosenPic = document.getElementsByTagName('img')[0].getAttribute('src');

    //iterar a traves de las opciones y rescatar las marcadas.
    let gender = document.querySelectorAll('.checkInput')  
    let arrayGender=[]
    gender.forEach((e) => {
        if (e.checked==true) {
          gender = e.value
          arrayGender.push(gender)
          console.log(arrayGender)
        }
    })
    
    createUserWithEmailAndPassword(auth, mailInput, passInput)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userId = user.uid;
        newUserData(userId, nickInput, bioInput, birthInput, chosenPic, arrayGender)
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


//registrar usuarios con cuenta google

function newGoogleUser() {
  let googleBtn = document.getElementById("google")
  googleBtn.addEventListener('click', function (event) {
    event.preventDefault()
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const userId = user.uid;
        googleUsers().then(data => { window.location.assign("/welcome") });
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(error.message)
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
      })
  }

//insertar en la base de datos y que se envie correo de verificacion, y que posteriormente se cargue la vista de bienvenida.
function newUserData(userId, nickInput, bioInput, birthInput, chosenPic, arrayGender){
    let userData = collection(db, "UsersList");
    const docUserData = addDoc(
      userData, {
        id: userId,
        Name: nickInput,
        Description: bioInput,
        Age: birthInput,
        Gender: arrayGender,
        Picture: chosenPic,
      })
      .then(() => {
        console.log('data registrada con éxito')
        sendEmailVerification(auth.currentUser)
        window.location.assign("/welcome")
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
     })
}

//login con cualquier correo
function logIn() {
  let loginBtn = document.querySelector('.nextBtn')
  loginBtn.addEventListener('click', function (event) {
    event.preventDefault()
    let mailInput = document.getElementById("mailInput").value;
    let passInput = document.getElementById("passInput").value;
    signInWithEmailAndPassword(auth, mailInput, passInput)
      .then((userCredential) => {
        window.location.assign("/dash")
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code)
        console.log(error.message)
        switch (errorCode) {
           case 'auth/wrong-password':
            alert('La contraseña es incorrecta')
            break;
          case 'auth/user-not-found':
            alert('El usuario no ha sido encontrado')
            break;
          case 'auth/invalid-email':
            alert('El correo no es válido')
            break;
           case 'auth/internal-error':
            alert('Ingrese la contraseña')
            break;
        }
      });
  event.stopImmediatePropagation()})
}

//insertar usuarios de google en la base de datos
const googleUsers= async()=> {
  const user = auth.currentUser;
  console.log(user)
  if (user !== null) {
    const docRef = await addDoc(collection(db, 'UsersList'), {
      id: user.uid,
      name: user.displayName,
      picture: user.photoURL,
    })
  }
}

//login con google
function logInGoogle() {
  let googleBtn = document.getElementById("googleLogin")
  googleBtn.addEventListener('click', function (event) {
    event.preventDefault()
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const userId = user.uid;
        window.location.assign("/dash")
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(error.message)
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
      })
}

export{newUser, newGoogleUser, logIn, logInGoogle}