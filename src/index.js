/* eslint-disable */
import { readURL } from './functions/functionsAnyMail.js';
import { identifyUser } from '../functions/functionsWelcome.js';
import { printProfilePic } from './functions/functionsDash.js';
// crear el directorio de rutas que queremos que tenga la web
import anyMail from './views/any-mail.js';
import dash from './views/dash.js';
import home from './views/home.js';
import login from './views/login.js';
import setMail from './views/set-mail.js';
import welcome from './views/welcome.js';

// importar funciones de firebase
import {
  newUser, newGoogleUser, logIn, logInGoogle, postData, postDash, logOut, auth, deletePost, likes, editPosts,
} from './firebase.js';

// diccionario de rutas
const screenPaths = {
  '/': {
    title: 'home',
    render: home,
  },
  '/registerAnyMail': {
    title: 'Register any mail',
    render: anyMail,
  },
  '/registerSetMail': {
    title: 'Register set mail',
    render: setMail,
  },
  '/login': {
    title: 'login',
    render: login,
  },
  '/welcome': {
    title: 'Welcome Message',
    render: welcome,
  },
  '/dash': {
    title: 'dashboard',
    render: dash,
  },
};

// Funcion principal router, permite renderizar las rutas imprimiendo en container.
function router() {
  const view = screenPaths[location.pathname];
  if (view) {
    document.title = view.title;
    document.getElementById('container').innerHTML = view.render();
  } else {
    history.replaceState('', '', '/');
  }
}

// manejar navegacion en "a" para dirigirnos a las distintas rutas.
window.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    history.pushState('', '', e.target.href);
    router();
  }

  // ejecutar funciones importadas según la vista
  switch (window.location.pathname) {
    case '/':
      newGoogleUser();
      break;
    case '/registerAnyMail':
      readURL();
      newUser();
      break;
    case '/registerSetMail':
      readURL();
      break;
    case '/login':
      logIn();
      logInGoogle();
      break;
    case '/welcome':
      identifyUser();
      break;
    case '/dash':
      postData();
      postDash().then((postArray) => {
        console.log(postArray);
        let dashHTML = '';
        postArray.forEach((postWall) => {
          if (postWall.uid === auth.currentUser.uid) {
            dashHTML += `
      <section id="publishedPost">
        <div id="titlePost">
          <div id="userInfo">
            <img id="postProfilePic" src=${postWall.picture} alt="foto de perfil">
            <p>${postWall.name}</p>
          </div>
          <div id="iconsPost">
          <img class="edit" src="./images/edit.png" alt="edit" data-idedit='${postWall.id}'>
          <img id="trash" src="./images/trash.png" alt="trash" data-id='${postWall.id}'>
          </div>
        </div>
        <article>
          <div class="hide">
            <p id="textPost">${postWall.description}</p>
          </div>
          <dialog id="editPost">
            <input id="editInput" type="text" value='${postWall.description}'>
            <div id="editBtns">
              <button class="buttonEdit" id="cancelar" type='button'>Cancelar</button>
              <button class="buttonEdit" id="guardar" type='button'>Guardar</button>
            </dialog>
          </div>
        </article>
        <div id="heart" class="hide"><img id="liked" data-idlikes='${postWall.id}' src="./images/heart1.png" alt="" >
        <p id="likesTotal">${postWall.likesCounter}</p>
        </div>
      </section>`;
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
          <div id="heart"><img id="liked" data-idlikes='${postWall.id}' src="./images/heart1.png" alt="">
          <p id="likesTotal">${postWall.likesCounter}</p>
          </div>
        </section>`;
          }
        });
        document.getElementById('publishedPostsCont').innerHTML = dashHTML;

        // Eliminar post
        document.querySelectorAll('#trash').forEach((element) => element.addEventListener('click', (e) => {
          const id = e.target.dataset.id;
          console.log(id);
          if (confirm('Quieres borrar el post?') == true) {
            deletePost(id);
          }
        }));
        // editar
        document.querySelectorAll('.edit').forEach((element) => element.addEventListener('click', (event) => {
          const targetPost = event.target;
          document.getElementById('editPost').showModal();
          const selectedPost = event.target.dataset.idedit;
          console.log(selectedPost);
          document.querySelectorAll('#guardar').forEach((element) => element.addEventListener('click', () => {
            const inputMsg = document.getElementById('editInput').value;
            editPosts(selectedPost, inputMsg);
            console.log(inputMsg);
          }));
          event.stopImmediatePropagation();
        }));

        // funcionalidad para dar like
        document.querySelectorAll('#liked').forEach((element) => element.addEventListener('click', (e) => {
          const like = e.target.dataset.idlikes;
          const selectedPost = e.target;
          console.log(like);
          selectedPost.setAttribute('src', './images/heart2.png');
          likes(like, auth.currentUser.uid);
        }));
      });
      logOut();
      printProfilePic();
      break;
  }
});
// permite guardar el historial y permite avanzar y retroceder
window.addEventListener('popstate', router);
// inicializar en el home
window.addEventListener('DOMContentLoaded', router);
/* eslint-enable */
