window.addEventListener("load", inicio, false);

function inicio(){
	boton=document.getElementById("menu");
	boton.addEventListener("click",eliminarSessionStorage, false); 
}


function eliminarSessionStorage(){
    sessionStorage.clear();
 }
 
 function eliminarLocalStorage(){
    localStorage.clear();
 }