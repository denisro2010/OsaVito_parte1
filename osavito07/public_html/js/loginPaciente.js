
window.addEventListener("load", inicio, false);
var bd;

function inicio(){
       boton=document.getElementById("btnloginpac");
       boton.addEventListener("click",login, false);
       
        var solicitud=indexedDB.open("OsaVito07");
	
	solicitud.onsuccess=function(e){
		bd=e.target.result;				
	};
	
}

function login(){
    var transaccion = bd.transaction(["pacientes"], "readonly");
    var objectStore = transaccion.objectStore("pacientes");
    objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
      
      if (cursor) {
          if(cursor.value.TIS !== document.getElementById("TIS").value || cursor.value.fecha !== document.getElementById("fechanacpac").value){
              alert("El usuario que has introducido no esta dado de alta en OsaVito07"); 
              location.href="http://localhost:8383/osavito07/loginPaciente.html";
          }
          else if(cursor.value.TIS === document.getElementById("TIS").value && cursor.value.fecha === document.getElementById("fechanacpac").value){
              location.href="http://localhost:8383/osavito07/asignarOCancelar.html";
          }
            cursor.continue();
      }
    };
}


