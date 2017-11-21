// JavaScript Document
var bd;
function iniciar(){
	zonadatos=document.getElementById("zonadatos");
	
	boton=document.getElementById("btnalta");
	boton.addEventListener("click",guardarNumColegiado, false);
        
        boton2 = document.getElementById("btnsanitarios");
	boton2.addEventListener("mousemove",mostrarSanitarios, false);
        
        
 
        var solicitud=indexedDB.open("OsaVito07", 4);
	
	solicitud.onsuccess=function(e){
		bd=e.target.result;				
	};
        
        solicitud.onerror=function(e){
		alert(solicitud.error.message);		
	};
	
	solicitud.onupgradeneeded=function(e){
		bd=e.target.result;
		bd.createObjectStore("citas", {keyPath: ["tis", "fecha"]});
	};	
}
      
function agregarobjeto(){
    
        for (var f = 0; f < sessionStorage.length; f++) {
        var tis = sessionStorage.key(f);
        }
        
        var numcita = Math.floor((Math.random() * 1000000) + 1);
        
        var fecha=document.getElementById("tiempolocal").value;
        
        var tiposanitario=document.getElementById("tiposanitario").value;
	
	var transaccion=bd.transaction(["citas"], "readwrite");
	
	var almacen=transaccion.objectStore("citas");
        
        var valid = document.formDatos.checkValidity();
        
        if(valid){
	       var agregar=almacen.add({numcita: numcita, tis: tis, fecha: fecha, tiposanitario: tiposanitario, numColegiado: numColegiado});
               agregar.addEventListener("success", mostrar, false);
               
               agregar.onsuccess = function(e){
                   alert('La cita se ha asignado correctamente. ID de su cita: ' + numcita);
                   location.href="http://localhost:8383/osavito07/asignarOCancelar.html";
               };
               
               agregar.onerror = function(e) {
               alert('Usted no puede coger una cita a la misma hora');
               location.href="http://localhost:8383/osavito07/asignarCita.html";
               };
        }
        else
            alert('Tiene que elegir la fecha y hora de su cita');
    
        
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

function guardarNumColegiado(){
    var tiposanitario=document.getElementById("tiposanitario").value;
    var transaccion = bd.transaction(["pacientesYsanitarios"], "readonly");
    var objectStore = transaccion.objectStore("pacientesYsanitarios");
    objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
      
      for (var f = 0; f < sessionStorage.length; f++) {
        var clave = sessionStorage.key(f);
      }
      
      if (cursor) {
          if(cursor.value.TIS === clave){
               if(cursor.value.tiposanitario === tiposanitario){
                   numColegiado = cursor.value.numColegiado;
                   agregarobjeto(numColegiado);
               }
              cursor.continue();
          }
          else{
          cursor.continue();
          }
      }
      else {
          if(numColegiado==='-1'){
            alert('Usetd no tiene a ese tipo de sanitario asignado o ha escogido una cita con un(a) matron(a) siendo hombre'); 
             location.href="http://localhost:8383/osavito07/asignarCita.html";
         }
      }
    };
}


var numColegiado = '-1';
window.addEventListener("load", iniciar, false);


