//crear el directorio de rutas que queremos que tenga la web
import { anyMail }  from "./views/any-mail.js"
import { dash }  from "./views/dash.js"
import { home }  from "./views/home.js"
import { login }  from "./views/login.js"
import { setMail }  from "./views/set-mail.js"
import { welcome } from "./views/welcome.js"

const screenPaths = {
    home: {
        path: "/",
        template: home()
    },
    registerAnyMail: {
        path: "/registeranymail",
        template: anyMail()
    },
    registerSetMail: {
        path:"/registersetmail",
        template: setMail()
    },
    login: {
        path: "/login",
        template: login()
    },
    welcome: {
        path: "/welcome",
        template: welcome()
    },
    dash: {
        path:"/dashboard",
        template: dash()
    }
}

export default screenPaths