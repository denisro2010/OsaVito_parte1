window.addEventListener("load", iniciar, false);
var bd;

function iniciar(){
	boton=document.getElementById("btnalta");
	boton.addEventListener("click",cancelarCita, false);

       var solicitud=indexedDB.open("OsaVito07", 4);
	
	solicitud.onsuccess=function(e){
		bd=e.target.result;				
	};
        
        solicitud.onerror=function(e){
		alert(solicitud.error.message);		
	};
	
	/*solicitud.onupgradeneeded=function(e){
		bd=e.target.result;
		bd.createObjectStore("citas", {keyPath: ["tis", "fecha"]});
	};*/
}

function cancelarCita(){
    var valid = document.formDatos.checkValidity();
    
    if(valid){
        
    var codCita = document.getElementById("numCita").value;
    var tis = document.getElementById("TIS").value;
    var transaccion = bd.transaction(["citas"], "readwrite");
    var objectStore = transaccion.objectStore("citas");
    var numCorrecto=false;
    
    objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    
    if (cursor) {
              if(cursor.value.numcita == codCita && cursor.value.tis == tis){
                  cursor.delete();
                  numCorrecto=true;
                  cursor.continue();
              }
          else{
          cursor.continue();
          }
      }
      else { //no more cursor
          if(numCorrecto)
           alert('La cita se ha borrado');
          else
           alert('Su cita no se ha podido borrar porque el TIS o el codigo de la cita no son validos');
      }
    
    };

    } //fin valid
 }


