//importar funciones
import { readURL } from "./functions/functionsAnyMail.js"
//crear el directorio de rutas que queremos que tenga la web
import anyMail  from "./views/any-mail.js"
import  dash    from "./views/dash.js"
import  home    from "./views/home.js"
import login    from "./views/login.js"
import setMail  from "./views/set-mail.js"
import welcome  from "./views/welcome.js"

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
  //ejecutar funciones importadas
  //registerUser();
  readURL()
})


//permite guardar el historial y permite avanzar y retroceder
window.addEventListener("popstate", router);
//inicializar en el home
window.addEventListener("DOMContentLoaded", router)

//inicializar firebase
// const config = {
//   apiKey: "AIzaSyC8vBCCnI6bXjAa3ZOAVJd5rFv1Doeg3c8",
//   authDomain: "red-social-ninverse.firebaseapp.com",
//   projectId: "red-social-ninverse",
//   storageBucket: "red-social-ninverse.appspot.com",
//   messagingSenderId: "985322603240",
//   appId: "1:985322603240:web:2334b8f836fa9a2e5c3f5d"
// };
// const app=initializeApp(config);


