window.addEventListener("load", iniciar, false);

function iniciar(){
    document.formDatos.addEventListener("invalid", validacion, true);
    document.formDatos.addEventListener("input", controlar, false);
    //document.getElementById("btnalta").addEventListener("click", comprobarFechaNac, false);
    document.getElementById("btnloginpac").addEventListener("click", enviarLoginPaciente, false); //Valida el login del paciente al hacer click en el boton correspondiente
}

function validacion(e) {
    var elemento = e.target;
    elemento.style.background = '#FFDDDD';
}

function controlar(e) {
    var elemento = e.target;
    if (elemento.validity.valid) {
        elemento.style.background = '#FFFFFF';
    } else {
        elemento.style.background = '#FFDDDD';
    }
}

function enviarLoginPaciente() {
    var elemento = document.getElementById("TIS");
    var fechanac = document.getElementById("fechanacpac");
    if (elemento.validity.valid && fechanac.validity.valid) {
        location.href="asignarOCancelar.html";
    }else{
        alert('El TIS que has introducido no es correcto');
    }
 }
 
 
/* NO HACEN FALTA, LA VALIDEZ YA SE COMPRUEBA CUANDO AÑADIMOS LOS DATOS A INDEXED DB !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  
 
 
 
function enviarAltaSanitario() {
    var numcolegiado = document.getElementById("cnNumColegiado");
    var nombresanitario = document.getElementById("gnombre");
    
    if (numcolegiado.validity.valid && nombresanitario.validity.valid) {
        location.href="altaSanitarios.html";
    }else{
        alert('Algun dato introducido no es correcto');
    }
}

/* NO HACE FALTA, LA VALIDEZ YA SE COMPRUEBA CUANDO AÑADIMOS LOS DATOS A INDEXED DB
 * 
function enviarAltaPaciente() {
    var tis = document.getElementById("TIS");
    var tlf = document.getElementById("telefono");
    var nombre = document.getElementById("gnombre");
    var fechanac = document.getElementById("fecha");
    var hombre = document.getElementById("hombre");
    var mujer = document.getElementById("mujer");
    var caja = document.getElementById("caja2");
    
    if (tis.validity.valid && tlf.validity.valid && nombre.validity.valid && fechanac.validity.valid && (hombre.validity.valid || mujer.validity.valid)) {
        location.href="altaPacientes.html";
    }else{
        alert('Algun dato introducido no es correcto o se ha dejado en blanco');
    }
}


/*
 * NO HACE FALTA, LA VALIDEZ YA SE COMPRUEBA CUANDO AÑADIMOS LOS DATOS A INDEXED DB
 
function enviarAsignarPaciente() {
    var tis = document.getElementById("TIS");
    var numcolegiado = document.getElementById("cnNumColegiado");
    
    if (tis.validity.valid && numcolegiado.validity.valid) {
        location.href="asignarPacientes.html";
    }else{
        alert('Algun dato introducido no es correcto');
    }
}


function enviarAsignarCita() {

    var fecha = document.getElementById("tiempolocal");

    
    if (fecha.validity.valid) {
        //alert('Su cita se ha asignado correctamente');
       // location.href="index.html";
    }else{
        alert('Algun dato introducido no es correcto o se ha dejado en blanco');
    }
}

function enviarCancelarCita() {
    var cita = document.getElementById("numCita");
    var tis = document.getElementById("TIS");
    
    if (cita.validity.valid && tis.validity.valid) {
       // alert('Su cita se ha cancelado correctamente');
       // location.href="asignarOCancelar.html";
    }else{
        alert('Algun dato introducido no es correcto o se ha dejado en blanco');
    }
}

*/