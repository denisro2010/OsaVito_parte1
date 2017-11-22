// JavaScript Document
var bd;
function iniciar(){
	zonadatos=document.getElementById("zonadatos");
	
	boton=document.getElementById("btnalta");
	
	boton.addEventListener("click",comprobarFechaNac, false);
 
        var solicitud=indexedDB.open("OsaVito07", 2);
	
	solicitud.onsuccess=function(e){
		bd=e.target.result;				
	};
        
        solicitud.onerror=function(e){
		alert(solicitud.error.message);		
	};
	
	solicitud.onupgradeneeded=function(e){
		bd=e.target.result;
		bd.createObjectStore("pacientes", {keyPath: "TIS"});
	};	
}
      
function agregarobjeto(){
        
	var TIS=document.getElementById("TIS").value;
	
	var gnombre=document.getElementById("gnombre").value;
	
	var telefono=document.getElementById("telefono").value;
        
        var fecha=document.getElementById("fecha").value;
        
        var hombre=document.getElementById("hombre").value;
        
        var mujer=document.getElementById("mujer").value;
	
	var transaccion=bd.transaction(["pacientes"], "readwrite");
	
	var almacen=transaccion.objectStore("pacientes");
        
        var agregar;
        
               if(document.getElementById('hombre').checked){
	       agregar=almacen.add({TIS: TIS, gnombre: gnombre, telefono: telefono, fecha: fecha, hombre: hombre});
               //agregar.addEventListener("success", mostrar, false);
               
               agregar.onsuccess = function(e){
                   alert('El paciente ha sido registrado correctamente');
                   location.href="altaPacientes.html";
               };
               
               agregar.onerror = function(e) {
               alert('El paciente que ha introducido ya existe en nuestra base de datos.');
               location.href="altaPacientes.html";
               };
               
               }
               else if(document.getElementById('mujer').checked){
                   agregar=almacen.add({TIS: TIS, gnombre: gnombre, telefono: telefono, fecha: fecha, mujer: mujer});
                   
                   agregar.onsuccess = function(e){
                   alert('El paciente ha sido registrado correctamente');
                   location.href="altaPacientes.html";
                   };
                   
               agregar.onerror = function(e) {
               alert('El paciente que ha introducido ya existe en nuestra base de datos.');
               location.href="altaPacientes.html";
               };
               
               }   
             
}

/*
function mostrar(){
	
	zonadatos.innerHTML="";
	
	var transaccion=bd.transaction(["pacientes"],"readonly");
	
	var almacen=transaccion.objectStore("pacientes");
	
	var cursor=almacen.openCursor();
	
	cursor.addEventListener("success", mostrarDatos, false);	
	
}

function mostrarDatos(e){
	
	var cursor=e.target.result;
	
	if(cursor){
		
		//zonadatos.innerHTML+="<div>" + cursor.value.TIS + " - " + cursor.value.gnombre + " - " + cursor.value.telefono +" - " + cursor.value.fecha + " - " +cursor.value.hombre +" - " + cursor.value.mujer + "</div>";
		
		cursor.continue();
		
		
	}

}*/

function comprobarFechaNac(){
    var fecha = document.getElementById("fecha");
    var today = new Date();
    var anyo = today.getFullYear();
    var mes = today.getMonth() + 1;
    var dia = today.getDate();
    
    if(dia<10) {
        dia='0'+dia;
    } 
    if(mes<10) {
       mes='0'+mes;
    } 
    var hoy = anyo + "-" + mes + "-" + dia;
    
    if(fecha.value < hoy){
        var valido = document.formDatos.checkValidity();
        if(valido){
         agregarobjeto();
        }
        else{
         alert('Algun dato introducido no es correcto'); 
        }
    }
    else{
        alert("Error en la fecha de nacimiento. La fecha introducida es posterior a hoy.");
    }
    
}

window.addEventListener("load", iniciar, false);


