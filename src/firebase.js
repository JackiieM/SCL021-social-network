//funcion para registrarse
const registerUser = () => {
let boton = document.getElementById('submitBtn')
    boton.addEventListener('click', function () {
        event.preventDefault()
        let email = document.getElementById('nickInput').value
        let password = document.getElementById('mailInput').value

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
            let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
        })
    })      
}

export {registerUser}