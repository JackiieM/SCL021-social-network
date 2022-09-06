function likesCounter() {
    let like = 0;
    document.getElementById('heart').addEventListener('click', function () {
        function likeClick() {
            like++
        }
    })
    document.getElementById("likes").innerHTML = like;
}
export {likesCounter}