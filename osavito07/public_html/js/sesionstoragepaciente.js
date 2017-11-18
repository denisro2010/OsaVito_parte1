window.addEventListener('load', iniciar, false);

function iniciar() {
    var boton = document.getElementById('btnloginpac');
    boton.addEventListener('click', nuevoitem, false);
    mostrar();
}
function nuevoitem() {
    var clave = document.getElementById('TIS').value;
    var valor = document.getElementById('fechanacpac').value;
    sessionStorage.setItem(clave, valor);
    mostrar();
    document.getElementById('TIS').value = '';
    document.getElementById('fechanacpac').value = '';
}
function mostrar() {
    var cajadatos = document.getElementById('cajadatos');
    cajadatos.innerHTML = '';
    for (var f = 0; f < sessionStorage.length; f++) {
        var clave = sessionStorage.key(f);
        var valor = sessionStorage.getItem(clave);
        cajadatos.innerHTML += 'TIS: ' + clave + ' <br  /> '  + 'Fecha de nacimiento: '+ valor + '</div>';
    }
}
