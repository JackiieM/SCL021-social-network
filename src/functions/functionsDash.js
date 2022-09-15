/* eslint-disable */
import { auth } from '../firebase.js';

function printProfilePic() {
  document.querySelector('.dashProfile').src = auth.currentUser.photoURL;
}setTimeout(printProfilePic, 500);

export { printProfilePic };
/* eslint-enable */
