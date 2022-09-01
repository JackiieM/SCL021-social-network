//exportar contenido de la pagina.
export default () =>
     `<header id="dashHeader">
     <img class="dashProfile" src="./images/default-profile.png" alt="Foto de perfil">
     <img class="logoNi" src="./images/logo-mini.gif" alt="logo">
     <nav>
       <img class="dots" src="./images/menu-dots.png" alt="puntos">
     </nav>
     </header>
       
     <section>
       <div id="contenedorPost">
         <input id="inputPost" type="textarea" rows="5" cols="40" maxlength="100" placeholder="¿Qué estás jugando?...">
         <div id="bottomPost">
           <div id="iconos">
             <img src="./images/gallery.png" alt="fotos">
             <img src="./images/film.png" alt="video">
             <img src="./images/at.png" alt="at">
           </div>
           <div id="postBtn">
             <button id="publishPost">Publicar</button>
           </div>
         </div>
       </div>
     </section>
       <hr>
     <section id="publishedPost">
       <div id="titlePost">
         <div id="userInfo">
           <img id="postProfilePic" src="./images/default-profile.png" alt="foto de perfil">
           <p>Nickname</p>
         </div>
         <div id="iconsPost">
     <img src="./images/edit.png" alt="edit">
     <img src="./images/trash.png" alt="trash">
         </div>
       </div>
       <article>
         <div>
           <img id="imagePost" alt="Imagen post">
           <p id="textPost">Texto Post</p>
         </div>
       </article>
       <div id="heart"> <img src="./images/heart1.png" alt=""></div>
     </section>`;


