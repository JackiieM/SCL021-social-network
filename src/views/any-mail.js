//exportar contenido de la pagina.
export default () =>
    `<div id="anyMailCont">
     <h4 id="titleRegister">Bienvenid@! Completa tus datos para registrarte en Niverse!</h4>
       <form id="formContent" action="">
        <div id="picCont">
        <img src="./images/default-profile.png" id="profilePic">
        <input type="file" id="fileUp">
        <label for="fileUp" id="uploadBtn"></label>
        </div>
      <div id="textInputCont">
        <input type="text" id="nickInput" class="formInpt" placeholder="Nickname" value="" required>   
        <input type="email" id="mailInput" class="formInpt" placeholder="email@mail.com" value="" reuqired>    
        <input type="password" id="passInput" class="formInpt" placeholder="******" minlength="6" value="" required>
        <input type="text" id="bioInput" class="formInpt" max="150" placeholder="Sobre ti..." value="" required>
        <input type="date" id="birthInput" class="formInpt" value="" required>
        <div class="containerPronouns">
        <h3 id="titlePronouns">Pronombres</h3>
        </div>
      <div id="proCont"> 
         <input type="checkbox" checked id="pro1Input" class="checkInput" value="ella"> <label class="checkInputText" for="pro1Input">Ella/She/Her</label> <br>
         <br>
         <input type="checkbox" id="pro2Input" class="checkInput" value="el"> <label class="checkInputText" for="pro2Input">El/He/Him</label> <br>
         <br>
         <input type="checkbox" id="pro3Input" class="checkInput" value="they"> <label class="checkInputText" for="pro3Input">Elle/They/Them</label>  <br>
         <br>
         </div>
        <div class="submitBtn">
        <button id="submitBtn" type="submit">Aceptar</button>
         </div>
        </div>
       </form>
    </div>`;



