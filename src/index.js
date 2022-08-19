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
})

//permite guardar el historial y permite avanzar y retroceder
window.addEventListener("popstate", router);
//inicializar en el home
window.addEventListener("DOMContentLoaded", router)




