/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function go(){
    var usr=document.getElementById("usuario");
    var clv=document.getElementById("clave");
if (usr.value==="admin" && clv.value==="admin"){ 
        document.form.submit();
    } 
    else{ 
         alert("El nombre de usuario o la clave no son correctos. Pruebe de nuevo."); 
    } 
} 


