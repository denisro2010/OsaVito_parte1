// JavaScript Document
var bd;
function iniciar(){
	zonadatos=document.getElementById("zonadatos");
	
	boton=document.getElementById("btnalta");
	
	boton.addEventListener("click",agregarobjeto, false);
        
        boton2=document.getElementById("btnsanitarios");
	boton2.addEventListener("click",mostrarSanitarios, false);
        
        
 
        var solicitud=indexedDB.open("OsaVito07", 4);
	
	solicitud.onsuccess=function(e){
		bd=e.target.result;				
	};
        
        solicitud.onerror=function(e){
		alert(solicitud.error.message);		
	};
	
	solicitud.onupgradeneeded=function(e){
		bd=e.target.result;
		bd.createObjectStore("citas", {keyPath: "id", autoIncrement: true});
	};	
}
      
function agregarobjeto(){
    
        for (var f = 0; f < sessionStorage.length; f++) {
        var clave = sessionStorage.key(f);
        }
        
        var fecha=document.getElementById("tiempolocal").value;
        
        var tiposanitario=document.getElementById("tiposanitario").value;
        
        //FALTA EL SANITARIO
	
	var transaccion=bd.transaction(["citas"], "readwrite");
	
	var almacen=transaccion.objectStore("citas");
        
        var valid = document.formDatos.checkValidity();
        
        if(valid){
	       var agregar=almacen.add({clave: clave, fecha: fecha, tiposanitario: tiposanitario});
               agregar.addEventListener("success", mostrar, false);
               
               agregar.onerror = function(e) {
               alert(agregar.error.name + '\n\n' + agregar.error.message);
               location.href="http://localhost:8383/osavito07/altaPacientes.html";
               };
           }
        
        document.getElementById("tiempolocal").value="";
        
        
}

function mostrar(){
	
	zonadatos.innerHTML="";
	
	var transaccion=bd.transaction(["citas"],"readonly");
	
	var almacen=transaccion.objectStore("citas");
	
	var cursor=almacen.openCursor();
	
	cursor.addEventListener("success", mostrarDatos, false);	
	
}

function mostrarDatos(e){
	
	var cursor=e.target.result;
	
	if(cursor){
		
		//zonadatos.innerHTML+="<div>" + cursor.value.TIS + " - " + cursor.value.gnombre + " - " + cursor.value.telefono +" - " + cursor.value.fecha + " - " +cursor.value.hombre +" - " + cursor.value.mujer + "</div>";
		
		cursor.continue();
		
		
	}

}

function mostrarSanitarios(){
    var cajadatos2 = document.getElementById('cajadatos2');
    cajadatos2.innerHTML = '';
    
    var transaccion = bd.transaction(["pacientesYsanitarios"], "readonly");
    var objectStore = transaccion.objectStore("pacientesYsanitarios");
    objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
      
      for (var f = 0; f < sessionStorage.length; f++) {
        var clave = sessionStorage.key(f);
      }
      
      if (cursor) {
          if(cursor.value.TIS === clave){
              cajadatos2.innerHTML+="<div>" + 'Numero de colegiado: '+ cursor.value.numColegiado + ' <br  /> ' +'Tipo de sanitario: '+ cursor.value.tiposanitario;
              cajadatos2.innerHTML+='<br  />';
              cursor.continue();
          }
          else{
          cursor.continue();
          }
      }
      else {
            
      }
    };
}

window.addEventListener("load", iniciar, false);


