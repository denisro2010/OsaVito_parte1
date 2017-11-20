// JavaScript Document
var bd;
function iniciar(){
	zonadatos=document.getElementById("zonadatos");
	
	boton=document.getElementById("btnalta");
	
	boton.addEventListener("click",agregarobjeto, false);
 
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
        
        var valid = document.formDatos.checkValidity();
        var agregar;
        
        if(valid){
               if(document.getElementById('hombre').checked){
	       agregar=almacen.add({TIS: TIS, gnombre: gnombre, telefono: telefono, fecha: fecha, hombre: hombre});
               agregar.addEventListener("success", mostrar, false);
               
               agregar.onerror = function(e) {
               alert(agregar.error.name + '\n\n' + agregar.error.message);
               location.href="http://localhost:8383/osavito07/altaPacientes.html";
               };
               }
               else if(document.getElementById('mujer').checked){
                   agregar=almacen.add({TIS: TIS, gnombre: gnombre, telefono: telefono, fecha: fecha, mujer: mujer});
                   agregar.addEventListener("success", mostrar, false);
                   agregar.onerror = function(e) {
                   alert(agregar.error.name + '\n\n' + agregar.error.message);
                   location.href="http://localhost:8383/osavito07/altaPacientes.html";
               };
               }   
           }
             
	document.getElementById("TIS").value="";
	
	document.getElementById("gnombre").value="";
	
	document.getElementById("telefono").value="";
        
        document.getElementById("fecha").value="";
        
        document.getElementById("hombre").value="";
        
        document.getElementById("mujer").value="";
}

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

}

window.addEventListener("load", iniciar, false);


