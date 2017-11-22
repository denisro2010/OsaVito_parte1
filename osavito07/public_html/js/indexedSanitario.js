
var bd;
function iniciar(){
	zonadatos=document.getElementById("zonadatos");
	
	boton=document.getElementById("btnalta");
	
	boton.addEventListener("click",agregarobjeto, false);
        
	var solicitud=indexedDB.open("OsaVito07",1);
	
	solicitud.onsuccess=function(e){
		bd=e.target.result;				
	};
        
        solicitud.onerror=function(e){
		alert(solicitud.error.message);		
	};
	
	solicitud.onupgradeneeded=function(e){
		bd=e.target.result;
		bd.createObjectStore("sanitarios", {keyPath: "cnNumColegiado"});
	};	
	
}
      
function agregarobjeto(){
	
	var cnNumColegiado=document.getElementById("cnNumColegiado").value;
	
	var gnombre=document.getElementById("gnombre").value;
	
	var tiposanitario=document.getElementById("tiposanitario").value;
	
	var transaccion=bd.transaction(["sanitarios"], "readwrite");
	
	var almacen=transaccion.objectStore("sanitarios");

       var valid = document.formDatos.checkValidity();
        
        if(valid){   
	var agregar=almacen.add({cnNumColegiado: cnNumColegiado, gnombre: gnombre, tiposanitario: tiposanitario});
             
       // agregar.addEventListener("success", mostrar, false);
 
         agregar.onsuccess = function (e){
             alert('El sanitario ha sido registrado correctamente.');
             location.href="altaSanitarios.html";
         };
         
         agregar.onerror = function(e) {
         alert('El numero de colegiado que ha introducido ya esta asignado a un sanitario');
         location.href="altaSanitarios.html";
         };
         }
         else{
           alert('Algun dato introducido es incorrecto.');
         }
     
}

/*
function mostrar(){
	
	zonadatos.innerHTML="";
	
	var transaccion=bd.transaction(["sanitarios"],"readonly");
	
	var almacen=transaccion.objectStore("sanitarios");
	
	var cursor=almacen.openCursor();
	
	cursor.addEventListener("success", mostrarDatos, false);	
	
}

function mostrarDatos(e){
	
	var cursor=e.target.result;
	
	if(cursor){
		
		//zonadatos.innerHTML+="<div>" + cursor.value.cnNumColegiado + " - " + cursor.value.gnombre + " - " + cursor.value.tiposanitario + "</div>";
		
		cursor.continue();
		
		
	}


}
*/

window.addEventListener("load", iniciar, false);


