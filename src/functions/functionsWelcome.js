import { auth } from "../firebase.js"

function identifyUser() {
console.log(auth)
document.getElementById('greeting').innerHTML = `It's a me ${auth.currentUser.displayName}!!!`}setTimeout(identifyUser, 500)
    
export { identifyUser }





