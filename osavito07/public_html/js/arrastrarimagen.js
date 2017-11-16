window.addEventListener('load', inicio, false);

function inicio() {
    document.getElementById('caja').addEventListener('dragover', permitirDrop, false);
    document.getElementById('caja').addEventListener('drop', drop, false);
}

function drop(ev)
{
    ev.preventDefault();
    var arch = new FileReader();
    arch.addEventListener('load', leer, false);
    arch.readAsDataURL(ev.dataTransfer.files[0]);
}

function permitirDrop(ev)
{
    ev.preventDefault();
}

function leer(ev) {
    document.getElementById('caja').style.backgroundImage = "url('" + ev.target.result + "')";
}

