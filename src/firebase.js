//importar modulos de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signOut, onAuthStateChanged, sendPasswordResetEmail, sendEmailVerification,
  signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js"
import {getFirestore, collection, addDoc, getDoc, getDocs,orderBy, Timestamp, deleteDoc, updateDoc, setDoc,query, where,limit} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

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

//inicializar storage
const storage = getStorage(app);

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
    //let chosenPic = document.getElementById('profilePic').src
    console.log(chosenPic)


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
        //uploadBytes(chosenPic)
        updateProfile(auth.currentUser, {displayName: nickInput}).then(() => {
          console.log('perfil creado')
        }).catch((error) => {
          console.log(error.message)
        })
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

//obtener informacion de un usuario para desplegarla en welcome (nombre) y en dash (nombre y foto)

// function obtainData() {
//   const user = auth.currentUser;
//   if (user !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   const displayName = user.displayName;
//   const email = user.email;
//   const photoURL = user.photoURL;
//   const emailVerified = user.emailVerified;
//   const bio = user.bioInput
//   const gender=user.gender

//   // The user's ID, unique to the Firebase project. Do NOT use
//   // this value to authenticate with your backend server, if
//   // you have one. Use User.getToken() instead.
//   const uid = user.uid;
// }
// }

//const profilePicRef = ref(storage, 'profilePictures/' + auth.currentUser.uid + '.jpg');

  // uploadBytes(profilePicRef, chosenPic).then((snapshot) => {
  //      snapshot.profilePicRef.getStorage().getDownloadURL().then(function(url){
  //        auth.currentUser.updateProfile({
  //        displayName: nickInput,
  //        photoURL: url
  //      })
  //       })
  //     });

/*function uploadBytes(chosenPic) {

  const metadata = {contentType: 'image/jpeg'};
  const storageRef = ref(storage, 'profilePictures/' + chosenPic);
  const uploadTask = uploadBytesResumable(storageRef, chosenPic, metadata);
// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  },
  (error) => { console.log(error.message)
  },
  
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
}*/

function activeUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
  
}

//hacer posts
function postData() {
  document.getElementById('publishPost').addEventListener('click', postUser); 
  event.preventDefault()
  function postUser() {
    let post = document.getElementById('inputPost').value
    if (post.length === 0) {
      alert('No hay nada que publicar!!')
    } else {
       console.log(post)
    addDoc(collection(db, 'Post'), {
    uid: auth.currentUser.uid,
    name: auth.currentUser.displayName,
    description: post,
    likes:[],
    likesCounter: 0,
    datepost: Timestamp.fromDate(new Date()), 
  });
  }event.stopImmediatePropagation()};
}

//funcion para recuperar los posts de la base de datos (se activa al hacer click (?))
 async function postDash() {
    const allPosts = query(collection(db, 'Post'), orderBy('datepost', 'desc'));
    const querySnapshot =  await getDocs(allPosts);
    let dashHTML = '';
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const postWall = doc.data()
      if (postWall.uid === auth.currentUser.uid) {
        dashHTML += `
    <section id="publishedPost">
      <div id="titlePost">
        <div id="userInfo">
          <img id="postProfilePic" src="./images/default-profile.png" alt="foto de perfil">
          <p>${postWall.name}</p>
        </div>
        <div id="iconsPost">
        <img src="./images/edit.png" alt="edit">
        <img src="./images/trash.png" alt="trash">
        </div>
      </div>
      <article>
        <div>
          <p id="textPost">${postWall.description}</p>
        </div>
      </article>
      <div id="heart"> <img src="./images/heart1.png" alt="">
      </div>
    </section>`
      } else {
        dashHTML += `
      <section id="publishedPost">
        <div id="titlePost">
          <div id="userInfo">
            <img id="postProfilePic" src="./images/default-profile.png" alt="foto de perfil">
            <p>${postWall.name}</p>
          </div>
          <div id="iconsPost">
          </div>
        </div>
        <article>
          <div>
            <p id="textPost">${postWall.description}</p>
          </div>
        </article>
        <div id="heart"> <img src="./images/heart1.png" alt="">
        </div>
      </section>`
      }
      document.getElementById('publishedPostsCont').innerHTML = dashHTML
    })
 };


//cerrar sesion
function logOut() {
  document.getElementById('logOutButton').addEventListener('click', function(){
  signOut(auth).then(() => {
  // Sign-out successful.
  window.location.assign("/")
}).catch((error) => {
  console.log(error.message)
});     
})
}

export{newUser, newGoogleUser, logIn, logInGoogle, auth, postData, postDash, logOut, createUserWithEmailAndPassword}