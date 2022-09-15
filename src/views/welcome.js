// exportar contenido de la pagina.
export default () => `<div class="welcome">
        <div id="welcomeCont">
        <p class="welcomeText" id="greeting"></p>
        <p class="welcomeText">Bienvenid@ a Niverse!</p>
        <div id="logoCont"><img src="./images/logo.gif" alt="logo Niverse"></div>
        <div id="toadCont"><img src="./images/toad-baila.gif" alt="toad"></div>
        <button id="nextBtn"><a href="/dash" data-link>Continuar a mi Dashboard</a></button>
        <button id="nextBtn"><a href="/registerSetMail" data-link>Editar mi perfil</a></button> 
      </div>
     <div id="charaCont">
        <img id="canelita" src="./images/canelita.png" alt="canelita">
        <img id="link" src="./images/link.png" alt="toon link">
        <img id="mario" src="./images/mario.png" alt="mario">
        <img id="pikachu" src="./images/pikachu.png" alt="pikachu">
        <img id="samus" src="./images/metroid.png" alt="samus">
        <img id="inkling" src="./images/splatoon.png" alt="inkling">
      </div>
      </div>`;
