
import { auth } from '../firebase.js';

function identifyUser() {

  document.getElementById('greeting').innerHTML = `It's a me ${auth.currentUser.displayName}!!!`;
}setTimeout(identifyUser, 500);

export { identifyUser };

