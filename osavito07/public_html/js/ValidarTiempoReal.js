
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


