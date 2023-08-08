// definimos variables

let rowSeleccionada = null; //Esta variable se usará más adelante para almacenar información sobre una fila seleccionada.


// mostramos alertas
//todo: se define funcion que muestra alerta que acepta los parametros mensaje y nombreEmpresa con lo cual crearemos alertas en la interfaz
function mostrarAlerta(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    
    div.appendChild(document.createTextNode(message)); // Esto coloca el mensaje dentro de la alerta.
    const container = document.querySelectorAll(".container")[1];//aqui seleccionamos los elementos del DOM
    const main = document.querySelector(".main");//aqui seleccionamos los elementos del DOM
    container.insertBefore(div, main);//aqui seleccionamos los elementos del DOM

    setTimeout(() => document.querySelector(".alert").remove(), 3000); //Se utiliza setTimeout para programar la eliminación de la alerta después de 3 segundos. selecciona el primer elemento con la clase .alert y lo elimina del DOM mediante el .remove
}




// BORRANDO CAMPOS

function borrarCampos(){
    document.querySelector("nombre").value = "";
}


//AÑADIR DATOS

document.querySelector("#registro").addEventListener("submit", (e)=>{
    e.preventDefault();

    //obtenemos valor de form
    const nombreEmpresa = document.querySelector("#empresa").value;

    //validamos
    debugger
    if( empresa.value == ""){
         mostrarAlerta("Porfavor ingresa el nombre de tu empresa para continuar" , "danger");
    }
    else{
        if(rowSeleccionada == null){
            const lista = document.querySelector("#registro");
            const row = document.createComment("tr");

            row.innerHTML = `
            <td>${nombreEmpresa}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm editar">Editar</a> 
            <a href="#" class="btn btn-danger btn-sm borrar">Eliminar</a>`;

            lista.appendChild(row);
            rowSeleccionada = null;
            mostrarAlerta("Empresa agregada", "succes");
        }
    }

});


// BORRAMOS DATA

document.querySelector(".registro-empresas").addEventListener("click", (e) => {
   target = e.target;
   if (target.listaEmpresas.contains(".eliminar")){
    target.parentElement.parentElement.remove();
    showAlert(" Empresa Eliminada" , "danger");
   }
});