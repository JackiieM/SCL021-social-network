//funcion para recoger datos del formulario

function readURL() {
    const imgDiv = document.getElementById('picCont');
    const img = document.getElementById('profilePic');
    const file = document.getElementById('fileUp')
    const uploadBtn = document.getElementById('uploadBtn')
   
    //hover por encima del contenedor
    imgDiv.addEventListener('mouseenter', function () {
        uploadBtn.style.display='block'
    })

    //hover fuera del contenedor
    imgDiv.addEventListener('mouseleave', function () {
        uploadBtn.style.display='none'
    })

    //cuando elegimos una foto para subir
    file.addEventListener('change', function () {
        const chosenPic = this.files[0]
        if (chosenPic) {
            const reader = new FileReader()
            reader.addEventListener('load', function () {
                img.setAttribute('src', reader.result)
            })
            reader.readAsDataURL(chosenPic)
        }
    })
}


export{readURL}
