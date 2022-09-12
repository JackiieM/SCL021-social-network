import { readURL } from "./functions/functionsAnyMail.js"
import { identifyUser } from "../functions/functionsWelcome.js";
import { printProfilePic } from "./functions/functionsDash.js";
//crear el directorio de rutas que queremos que tenga la web
import anyMail  from "./views/any-mail.js"
import  dash    from "./views/dash.js"
import  home    from "./views/home.js"
import login    from "./views/login.js"
import setMail  from "./views/set-mail.js"
import welcome from "./views/welcome.js"

//importar funciones de firebase
import { newUser, newGoogleUser, logIn, logInGoogle, postData, postDash, logOut, auth, deletePost, likes} from "./firebase.js"

//diccionario de rutas
const screenPaths = {
  "/": {
    title: "home",
    render: home
  },
  "/registerAnyMail": {
    title: "Register any mail",
    render: anyMail
  },
  "/registerSetMail": {
    title: "Register set mail",
    render: setMail
  },
  "/login": {
    title: "login",
    render: login
  },
  "/welcome": {
    title: "Welcome Message",
    render: welcome
  },
  "/dash": {
    title: "dashboard",
    render: dash
  }
};

// Funcion principal router, permite renderizar las rutas imprimiendo en container.
function router() {
  let view = screenPaths[location.pathname];
  if (view) {
    document.title = view.title;
    document.getElementById('container').innerHTML = view.render();
  } else {
    history.replaceState("", "", "/")
  }
};

//manejar navegacion en "a" para dirigirnos a las distintas rutas.
window.addEventListener("click", e => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    history.pushState("", "", e.target.href)
    router()
  }

  //ejecutar funciones importadas según la vista
switch (window.location.pathname) {
  case "/" :
    newGoogleUser()
    break;
  case "/registerAnyMail":
    readURL();
    newUser(); 
    break;
  case "/registerSetMail":
    readURL();
    break;
  case "/login":
    logIn();
    logInGoogle();
    break;
  case "/welcome":
    identifyUser();
    break;
  case "/dash":
    postData();
    postDash().then((postArray) => {
      console.log(postArray)
      let dashHTML = "";
      postArray.forEach(postWall => {

        if (postWall.uid === auth.currentUser.uid) {
          dashHTML += `
      <section id="publishedPost">
        <div id="titlePost">
          <div id="userInfo">
            <img id="postProfilePic" src=${postWall.picture} alt="foto de perfil">
            <p>${postWall.name}</p>
          </div>
          <div id="iconsPost">
          <img id="edit" src="./images/edit.png" alt="edit">
          <img id="trash" src="./images/trash.png" alt="trash" data-id='${postWall.id}'>
          </div>
        </div>
        <article>
          <div>
            <p id="textPost">${postWall.description}</p>
          </div>
        </article>
        <div id="heart" data-id='${postWall.id}'><img src="./images/heart1.png" alt="" >
        </div>
      </section>`
        } else {
          dashHTML += `
        <section id="publishedPost">
          <div id="titlePost">
            <div id="userInfo">
              <img id="postProfilePic" src="${postWall.picture}" alt="foto de perfil">
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
          <div id="heart" data-id='${postWall.id}'><img src="./images/heart1.png" alt="">
          </div>
        </section>`
        }
      })
      document.getElementById('publishedPostsCont').innerHTML = dashHTML
      
      //Eliminar post
        document.querySelectorAll('#trash').forEach(element=>element.addEventListener('click', (e) => {
          let id = e.target.dataset.id
          if (confirm("Quieres borrar el post?") == true) {
            deletePost(id)
          }          
        }))
      //editar

      //like
      document.querySelectorAll('#heart').forEach(element=>element.addEventListener('click', (e) => {
        let like = e.target.dataset.id 
        likes(like)
      }))
    })
    logOut();
    printProfilePic();
    break;
  }
})
//permite guardar el historial y permite avanzar y retroceder
window.addEventListener("popstate", router);
//inicializar en el home
window.addEventListener("DOMContentLoaded", router)




