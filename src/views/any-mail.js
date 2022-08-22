//exportar contenido de la pagina.
export default () =>
    `<div id="anyMailCont">
       <form id="formContent" action="">
        <label for="profilePicture">Escoge una imagen para tu perfil</label>
        <div id="profileUp">
         <div id="inputCont">
           <div id="displayCont">
          <input type="file" id="image-input" accept="image/jpeg, image/png, image/jpg">
        </div> 
        <div class="avatar-preview">
            <div id="display-image"></div>
        </div> 
      </div>
      </div>
        <input type="text" id="nickInput" class="formInpt" value="">
        <input type="email" id="mailInput" class="formInpt" value=""> 
        <input type="password" id="passInput" class="formInpt" value="">
        <input type="text" id="bioInput" class="formInpt" max="150" value="">
        <input type="date" id="birthInput" class="formInpt" value="">
        <h3>Pronouns</h3>
        <input type="checkbox" id="pro1Input" class="formInpt" value="ella">
         <label for="pro1Input">Ella/She/Her</label>
        <input type="checkbox" id="pro2Input" class="formInpt" value="el">
         <label for="pro2Input">El/He/Him</label>
        <input type="checkbox" id="pro3Input" class="formInpt" value="they">
         <label for="pro3Input">Elle/They/Them</label>
        <button id="submitBtn" type="submit">Aceptar</button>
       </form>
    </div>`;


