
function readURL() {
    document.getElementById('image-input').addEventListener('change', function () {
        const file = document.getElementById("image-input").files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            document.getElementById("display-image").style.backgroundImage = "url(" + reader.result + ")"; 
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
        }
    })
}
export{readURL}

