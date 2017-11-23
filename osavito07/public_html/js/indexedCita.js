var bd;
var numColegiado = '-1';
window.addEventListener("load", iniciar, false);

function iniciar(){
	zonadatos=document.getElementById("zonadatos");
	
	boton=document.getElementById("btnalta");
	boton.addEventListener("click",comprobarFechaCita, false);
        //boton.addEventListener("click",guardarNumColegiado, false);
        
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
		bd.createObjectStore("citas", {keyPath: ["tis", "fechaCita", "horaCita"]});
	};	
}
      
function agregarobjeto(){
    
        for (var f = 0; f < sessionStorage.length; f++) {
        var tis = sessionStorage.key(f);
        }
        
        var numcita = Math.floor((Math.random() * 1000000) + 1);
        
        var fechaCita=document.getElementById("fechaCita").value;
        
        var horaCita=document.getElementById("horaCita").value;
        
        var tiposanitario=document.getElementById("tiposanitario").value;
	
	var transaccion=bd.transaction(["citas"], "readwrite");
	
	var almacen=transaccion.objectStore("citas");
        
        var valid = document.formDatos.checkValidity();
        
        if(valid){
	       var agregar=almacen.add({numcita: numcita, tis: tis, fechaCita: fechaCita, horaCita: horaCita, tiposanitario: tiposanitario, numColegiado: numColegiado});
               //agregar.addEventListener("success", mostrar, false);
               
               agregar.onsuccess = function(e){
                   alert('La cita se ha asignado correctamente. ID de su cita: ' + numcita);
                   location.href="asignarOCancelar.html";
               };
               
               agregar.onerror = function(e) {
               alert('Usted no puede coger una cita a la misma hora');
               location.href="asignarCita.html";
               };
        }
        else
            alert('Tiene que elegir la fecha y hora de su cita');
    
        
}

/*
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
*/

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
             location.href="asignarCita.html";
         }
      }
    };
}

function comprobarFechaCita(){
    var fecha = document.getElementById("fechaCita");
    var reloj = document.getElementById("horaCita");
    var today = new Date();
    
    //ver que dia de la semana ha escogido el usuario para controlar que no se cojan citas los fines de semana
    var elegido = new Date(fecha.value);
    var numDiaElegido = elegido.getDay();
    
    var anyo = today.getFullYear();
    var mes = today.getMonth()+1;
    var dia = today.getDate();
    var hora = today.getHours();
    var min = today.getMinutes();

    if(min<10){
        min='0'+min;
    }
    
    if(hora<10){
        hora='0'+hora;
    }
    
    if(dia<10) {
        dia='0'+dia;
    } 

    if(mes<10) {
       mes='0'+mes;
    } 

    var hoy = anyo + "-" + mes + "-" + dia;
    var relojActual = hora + ":" + min;
    var valido = document.formDatos.checkValidity();
    
    if(valido){
       
    if(fecha.value < hoy){
            alert("La fecha introducida es incorrecta.");
            location.href="asignarCita.html";
    }
    else if(fecha.value === hoy){
        if(reloj.value <= relojActual){
            alert("La hora introducida es incorrecta.");
            location.href="asignarCita.html";
        }
        else if(today.getDay() === '6' || today.getDay() === '0'){
            alert('Usted no puede coger una cita un fin de semana');
            location.href="asignarCita.html";
        }
        else{
            guardarNumColegiado();
        }
    }
    else{
        if(numDiaElegido === 6 || numDiaElegido === 0){
        alert('Usted no puede coger una cita un fin de semana');
        location.href="asignarCita.html";
        }
        else{
         guardarNumColegiado();
        }
    } 
}
    else{ //si el formulario no es valido
        alert('Algun dato introducido no es correcto o se ha dejado en blanco.');
        location.href="asignarCita.html";
    }
    
} //fin function



