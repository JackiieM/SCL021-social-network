//logica de las rutas
import screenPaths from './routes.js';

export class router {
    constructor(routes){
        this.routes=routes
        this.initRouter()
    }
    
    initRouter(){
        const {
            location: {
                pathname = "/"
            }
        } = window;
        const urlAddress = pathname === "/" ? 'home' : pathname.replace("/", "")
        this.load(urlAddress)
    }
    load(view= "home"){
        const {routes} = this;
        const {path, template} = routes[view] || routes.error;
        const mainContainer = document.getElementById("container");
        mainContainer.innerHTML = template;
        window.history.pushState({}, "Done", path);
    }

}



