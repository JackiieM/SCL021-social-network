//importar modulos de firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js'
    // Add Firebase products that you want to use
    import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js'
    import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js'

//inicializacion de firebase
const firebaseConfig = {
    apiKey: "AIzaSyC8vBCCnI6bXjAa3ZOAVJd5rFv1Doeg3c8",
    authDomain: "red-social-ninverse.firebaseapp.com",
    projectId: "red-social-ninverse",
    storageBucket: "red-social-ninverse.appspot.com",
    messagingSenderId: "985322603240",
    appId: "1:985322603240:web:2334b8f836fa9a2e5c3f5d"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
//crear usuario con correo electronico
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });