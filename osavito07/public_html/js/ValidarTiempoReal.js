
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


