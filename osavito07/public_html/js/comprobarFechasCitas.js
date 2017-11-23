window.addEventListener("load", iniciar, false);

function iniciar(){
    document.getElementById("btnalta").addEventListener("click", comprobarFechaCita, false);
}

function comprobarFechaCita(){
    var fecha = document.getElementById("fechita");
    var reloj = document.getElementById("horita");
    var today = new Date();
    
    var anyo = today.getFullYear();
    var mes = today.getMonth()+1;
    var dia = today.getDate();
    var hora = today.getHours();
    var min = today.getMinutes();
    
    if(min<10){
        min='0'+min;
    }
    
    if(hora<10){
        hora='0'+hora;
    }
    
    if(dia<10) {
        dia='0'+dia;
    } 

    if(mes<10) {
       mes='0'+mes;
    } 

    var hoy = anyo + "-" + mes + "-" + dia;
    var relojActual = hora + ":" + min;
    
    if(fecha.value < hoy){
        alert("La fecha introducida es incorrecta.");
    }
    else if(fecha.value === hoy){
        if(reloj.value <= relojActual){
            alert("La hora introducida es incorrecta.");
        }
    }
    else{
        alert("Los datos introducidos son correctos.");
    }
    
}
