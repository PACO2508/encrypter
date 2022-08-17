var btn_encriptar = document.querySelector("#btn-encriptar");
var btn_desencriptar = document.querySelector("#btn-desencriptar");
var btn_copiar = document.getElementById("btn-copiar");
var captura_txtUser = document.querySelector("#txt-captura");
var letrasEncriptadas = ["ai", "enter", "imes", "ober", "ufat"];
var letrasSustituir = ["a","e","i","o","u"];

//Validacion de textarea de entrada: vacío, mayúsculas y acentos-------
function validacion(textoUser) {
    var validarTxt = textoUser.trim(); //Quitar espacio
    validarTxt = validarTxt.replace(/\n/g, ""); //Quitar saltos de linea
    var mayuscTxt = /[A-Z\u00C0-\u017F]/.test(validarTxt); //Comprobar el texto posee mayúsculas o letras con acentos
  
    if (validarTxt.length == 0 ) {
      alert("No ha ingresado ningun texto");
      return false
    }else if (mayuscTxt == true){ 
      var respuesta = confirm("El texto ingresado posee mayúsculas o acentos, estas letras no serán procesadas.\n¿Desea continuar?");

            if (respuesta == false) {
              return false
            }else{
              return true
            }
    }else{
      return true
    }
}

//crear elementos para enviar al HTML
function showHTML() {
  var showtxtArea = document.getElementById("show-txtArea");
     btn_copiar.style.visibility = "visible";
     showtxtArea = showtxtArea.innerHTML = "<textarea id='txt-Resultado' class='msg-resultado' readonly rows='10'> </textarea>"
}

//funcion reemplazar textos
function sustituir_txt(str, txt_buscar, txt_reemplazar) {
  var txt_modificado = str.replaceAll(txt_buscar, txt_reemplazar);
  return txt_modificado;
}

//encriptar el contenido del textarea
function encriptarTxt() {
    var capturaTxt = captura_txtUser.value;   
    var sustituir = "";

    if (validacion(capturaTxt)) {
        for (var i = 0; i < capturaTxt.length; i++) {
            var cambio = capturaTxt.charAt(i);

              if (capturaTxt.charAt(i) == letrasSustituir[0]) {
                sustituir += cambio.replace(capturaTxt.charAt(i), letrasEncriptadas[0]);
              } else if(capturaTxt.charAt(i) == letrasSustituir[1]){
                sustituir += cambio.replace(capturaTxt.charAt(i), letrasEncriptadas[1]);
              }else if(capturaTxt.charAt(i) == letrasSustituir[2]){
                sustituir += cambio.replace(capturaTxt.charAt(i), letrasEncriptadas[2]);
              }else if(capturaTxt.charAt(i) == letrasSustituir[3]){
                sustituir += cambio.replace(capturaTxt.charAt(i), letrasEncriptadas[3]);
              }else if(capturaTxt.charAt(i) == letrasSustituir[4]){
                sustituir += cambio.replace(capturaTxt.charAt(i), letrasEncriptadas[4]); 
              }else { 
                sustituir += capturaTxt.charAt(i);
              }
        }
        showHTML();
   } 
  document.querySelector("#txt-Resultado").innerHTML = sustituir;
}
btn_encriptar.onclick = encriptarTxt;

//desencriptar el contenido del textarea
function desencriptarTxt (){
  var capturaTxt = captura_txtUser.value; 
    if (validacion(capturaTxt)){
      
      for (const i in letrasEncriptadas) {
          capturaTxt  = sustituir_txt(capturaTxt, letrasEncriptadas[i], letrasSustituir[i]);
        }
        showHTML()
        document.querySelector("#txt-Resultado").innerHTML = capturaTxt;
      }
  }
btn_desencriptar.onclick = desencriptarTxt;

//Funcion para COPIAR el texto resultado de la encriptado o desencriptado
function copiarText() {
  var txtcopy = document.querySelector("#txt-Resultado");
  var seleccion = document.createRange();
  
  seleccion.selectNodeContents(txtcopy);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(seleccion);
  var copiar = document.execCommand("copy");
  if(copiar){alert("El texto a sido copiado")};
  
}
btn_copiar.onclick = copiarText;