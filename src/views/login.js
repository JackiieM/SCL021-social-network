/* eslint-disable */
// exportar contenido de la pagina.
export default () => `<div id="contHome">
<header id="logoContHome">
    <img class="logoHome" src="./images/logo.gif" alt="logoGrande">
</header>
  <main>
  <div id="loginInputCont">
  <input type="email" id="mailInput" class="formInpt" placeholder="email@mail.com" value="" reuqired>    
  <input type="password" id="passInput" class="formInpt" placeholder="******" minlength="6" value="" required>
  </div>
  <div class="loginBtn">
   <button id="nextBtn" class="nextBtn">Iniciar sesión</button> 
   </div>
    <h2 id="register">O inicie sesión con una de estas cuentas</h2>
    <div id="icons">
     <div class="contIcon" id='googleLogin'><img src="./images/google.png" alt="google"></div>
     <div class="contIcon"><img src="./images/apple-logo.png" alt="apple"></div>
     <div class="contIcon"><img src="./images/yahoo.png" alt="yahoo"></div>
     <div class="contIcon"><img src="./images/microsoft.png" alt="microsoft"></div>
    </div>
    <div id="contPikachu">
    <img src="https://c.tenor.com/FjvyyCwzuEQAAAAi/pikachu-happy.gif" alt="Pikachu feliz">
    </div>
    </main>
  </div>`;
/* eslint-enable */
