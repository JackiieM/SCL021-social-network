import { auth } from "../firebase.js"

function printProfilePic() {
document.querySelector('.dashProfile').src = auth.currentUser.photoURL}setTimeout(printProfilePic, 500)
    
export { printProfilePic }


// function likesCounter() {
//     let like = 0;
//     document.getElementById('heart').addEventListener('click', function () {
//         function likeClick() {
//             like++
//         }
//     })
//     document.getElementById("likes").innerHTML = like;
//}
