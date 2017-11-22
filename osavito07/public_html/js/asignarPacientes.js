var bd;
window.addEventListener("load", iniciar, false);
var existePac=false;
var noMatrona=false;
var hombre = false;

var existeMed = false;
var medico = false;
var enfermera = false;
var matrona = false;


function iniciar(){
	zonadatos=document.getElementById("zonadatos");
	
	boton=document.getElementById("btnasignarpacientes");
	
	boton.addEventListener("click",tipoSanitario, false);
 
        var solicitud=indexedDB.open("OsaVito07", 3);
	
	solicitud.onsuccess=function(e){
		bd=e.target.result;				
	};
        
        solicitud.onerror=function(e){
		alert(solicitud.error.message);		
	};
	
	solicitud.onupgradeneeded=function(e){
		bd=e.target.result;
		bd.createObjectStore("pacientesYsanitarios", {keyPath: ["TIS", "tiposanitario"]});
	};	
}
      
function agregarobjeto(){
    
        var TIS=document.getElementById("TIS").value;
        
        var numColegiado=document.getElementById("cnNumColegiado").value;

        if(medico)
        var tiposanitario='01';
        else if(enfermera)
        var tiposanitario='02';
        else if(matrona)
        var tiposanitario='03';
        
        var transaccion=bd.transaction(["pacientesYsanitarios"], "readwrite");
	var almacen=transaccion.objectStore("pacientesYsanitarios");
        
        var valid = document.formDatos.checkValidity();
        
        if(valid && existePac && (!hombre || (hombre && !(tiposanitario === '03')))){   
	var agregar=almacen.add({TIS: TIS, numColegiado: numColegiado, tiposanitario: tiposanitario});
        
         agregar.onerror = function(e) { //esto viene con Indexed DB, por si hay claves repetidas
         alert('El paciente ya tiene asignado el tipo de sanitario que usted ha especificado');
         location.href="asignarPacientes.html";
         };
         
         agregar.onsuccess = function(e) {
         alert('El paciente ha sido asignado correctamente');
         location.href="asignarPacientes.html";
         };
        }
        else if(!existePac){
            alert('El paciente no existe');
        }
        else if(hombre && (tiposanitario === '03')){
            alert('Un paciente hombre no puede tener asignado un(a) matron(a)');
        }
        else if(!valid){
            alert('Algun dato que ha introducido es incorrecto.');
            location.href="asignarPacientes.html";
        }
}

/*
function mostrar(){
	
	zonadatos.innerHTML="";
	
	var transaccion=bd.transaction(["pacientesYsanitarios"],"readonly");
	
	var almacen=transaccion.objectStore("pacientesYsanitarios");
	
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

function existePaciente(){
    if(existeMed){
        
    var transaccion = bd.transaction(["pacientes"], "readonly");
    var objectStore = transaccion.objectStore("pacientes");
    objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
      if (cursor) {
          if(cursor.value.TIS === document.getElementById("TIS").value){
              if(cursor.value.hombre === 'H'){
              agregarobjeto(existePac = true, hombre = true);
              }
              else if(cursor.value.mujer === 'M')
              agregarobjeto(existePac = true, hombre = false);   
          }
          else{
          cursor.continue();
          }
      }  
      else{
          if(!existePac){
              agregarobjeto(existePac = false);
          }
      }
    };
    
    }
    else
        alert('El sanitario introducido no existe en la base de datos');
}

function tipoSanitario(){
    var transaccion = bd.transaction(["sanitarios"], "readonly");
    var objectStore = transaccion.objectStore("sanitarios");
    objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
      if (cursor) {
          if(cursor.value.cnNumColegiado === document.getElementById("cnNumColegiado").value){
              if(cursor.value.tiposanitario === '01'){
                  existePaciente(existeMed=true, medico=true);
              }
              else if(cursor.value.tiposanitario === '02'){
                  existePaciente(existeMed=true, enfermera=true);
              }
              else if(cursor.value.tiposanitario === '03'){
                  existePaciente(existeMed=true, matrona=true);  
              }
          }
          else{
          cursor.continue();
          }
      }  
      else{
          if(!existeMed)
              existePaciente(existeMed = false);
      }
    };
}



