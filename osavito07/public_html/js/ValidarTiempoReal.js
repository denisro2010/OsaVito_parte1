
function controlarNombre() {
    var elemento = document.getElementById("gnombre");
    if (elemento.validity.valid) {
        elemento.style.background = '#FFFFFF';
    } else {
        elemento.style.background = '#FFDDDD';
    }
}

function controlarNumColegiado() {
    var elemento = document.getElementById("cnNumColegiado");
    if (elemento.validity.valid) {
        elemento.style.background = '#FFFFFF';
    } else {
        elemento.style.background = '#FFDDDD';
    }
}

function controlarTIS() {
    var elemento = document.getElementById("TIS");
    if (elemento.validity.valid) {
        elemento.style.background = '#FFFFFF';
    } else {
        elemento.style.background = '#FFDDDD';
    }
}

function controlarTelefono() {
    var elemento = document.getElementById("telefono");
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
        location.href="http://localhost:8383/osavito07/asignarOCancelar.html";
    }else{
        alert('El TIS que has introducido no es correcto');
    }
 }

function enviarAltaSanitario() {
    var numcolegiado = document.getElementById("cnNumColegiado");
    var nombresanitario = document.getElementById("gnombre");
    
    if (numcolegiado.validity.valid && nombresanitario.validity.valid) {
        location.href="http://localhost:8383/osavito07/altaPacientes.html";
    }else{
        alert('Algun dato introducido no es correcto');
    }
}

function enviarAltaPaciente() {
    var tis = document.getElementById("TIS");
    var tlf = document.getElementById("telefono");
    var nombre = document.getElementById("gnombre");
    var fechanac = document.getElementById("fecha");
    var hombre = document.getElementById("hombre");
    var mujer = document.getElementById("mujer");
    var caja = document.getElementById("caja2");
    
    if (tis.validity.valid && tlf.validity.valid && nombre.validity.valid && fechanac.validity.valid && (hombre.validity.valid || mujer.validity.valid)) {
        location.href="http://localhost:8383/osavito07/asignarPacientes.html";
    }else{
        alert('Algun dato introducido no es correcto o se ha dejado en blanco');
    }
}

function enviarAsignarPaciente() {
    var tis = document.getElementById("TIS");
    var numcolegiado = document.getElementById("cnNumColegiado");
    
    if (tis.validity.valid && numcolegiado.validity.valid) {
        alert('El paciente se ha asignado correctamente')
        location.href="http://localhost:8383/osavito07/asignarPacientes.html";
    }else{
        alert('Algun dato introducido no es correcto');
    }
}

function enviarAsignarCita() {

    var fecha = document.getElementById("tiempolocal");

    
    if (fecha.validity.valid) {
        alert('Su cita se ha asignado correctamente');
        location.href="http://localhost:8383/osavito07/index.html";
    }else{
        alert('Algun dato introducido no es correcto o se ha dejado en blanco');
    }
}

function controlarNumCita() {
    var elemento = document.getElementById("numCita");
    if (elemento.validity.valid) {
        elemento.style.background = '#FFFFFF';
    } else {
        elemento.style.background = '#FFDDDD';
    }
}

function enviarCancelarCita() {
    var cita = document.getElementById("numCita");
    var tis = document.getElementById("TIS");
    
    if (cita.validity.valid && tis.validity.valid) {
        alert('Su cita se ha cancelado correctamente');
        location.href="http://localhost:8383/osavito07/asignarOCancelar.html";
    }else{
        alert('Algun dato introducido no es correcto o se ha dejado en blanco');
    }
}