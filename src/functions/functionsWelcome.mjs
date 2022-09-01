import { dataAuth } from "./firebase.js"

function identifyUser() {
  window.addEventListener('onload', function () {
    document.getElementById('greeting').innerHTML += `It's a me ${dataAuth}!!!`
  })
}

export {identifyUser}