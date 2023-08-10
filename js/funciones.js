window.onload = (event) => {   //carga el evento de los registrados almacenados en el localstorage
    var tablaRegistrados = document.getElementById("registrados"); // obtiene los elementos de la tabla 
    var empresasGuardadas = localStorage.getItem("tbRegistrado"); // obtiene los datos dentro de LS

    if (empresasGuardadas) {  // aqui validamos si viene con información dentro de LS

        let empresas = JSON.parse(empresasGuardadas);

        let trRegistros = "";

        for (let i = 0; i < empresas.length; i++) { // aqui hacemos el recorrido para armar el interior de la tabla en HTML
            trRegistros = trRegistros + `
                <tr>
                    <td>${empresas[i].nombre}</td>
                    <td> <a href="#" class="btn btn-warning btn-sm editar">Editar</a> 
                        <a href="#" class="btn btn-danger btn-sm borrar">Eliminar</a></td>
                </tr>
            `
            tablaRegistrados.innerHTML = trRegistros;
        }        
    }
};

// Definimos nuestra variable global

let rowSeleccionada = null; //Esta variable se usará más adelante para almacenar información sobre una fila seleccionada.


//! AQUI CREAMOS LAS ALERTAS 

//se define funcion que muestra alerta que acepta los parametros mensaje y nombreEmpresa con lo cual crearemos alertas en la interfaz de bootstrap
function mostrarAlerta(message, className){ // Aqui definimo la funcion mostrarAlerta dandole Parametros para ejecutarlos
    const div = document.createElement("div"); // le indicamos que nos cree un div
    div.className = `alert alert-${className}`; // que tenga la clase alert de bootstrap
    
    div.appendChild(document.createTextNode(message)); // Esto coloca el mensaje dentro de la alerta.
    const container = document.querySelectorAll(".container")[1];//aqui seleccionamos los elementos del DOM
    const main = document.querySelector(".main");//aqui seleccionamos los elementos del DOM
    container.insertBefore(div, main);//aqui seleccionamos los elementos del DOM

    setTimeout(() => document.querySelector(".alert").remove(), 3000); //Se utiliza setTimeout para programar la eliminación de la alerta después de 3 segundos. selecciona el primer elemento con la clase .alert y lo elimina del DOM mediante el .remove
}




// * *  BORRANDO CAMPOS

function borrarCampos(){ // esta funcion es para dejar los campos vacios del input empresa
    document.querySelector("#empresa").value = "";
}


// ** AÑADIENDO DATOS

document.querySelector("#registro").addEventListener("submit", (e)=>{ // aqui al presionar el boton submit nos ejecutara el evento a definir
    e.preventDefault();
    
    //obtenemos valor de form
    const nombreEmpresa = document.querySelector("#empresa").value;

    //validamos recorriendo con un FOR que nos muestre una alerta en el caso de que el input este vacio
    if( empresa.value == ""){
         mostrarAlerta("Porfavor ingresa el nombre de tu empresa para continuar" , "danger");
    }
    //si esque esta el valor repetido nos generara otra alerta que indique que ya existe
    else{
        if(rowSeleccionada == null){
            const lista = document.querySelector("#registrados");
            const row = document.createElement("tr");

            const filas = document.getElementsByTagName("tr")

            for (let i = 1; i < filas.length; i++) {
                if(filas[i]){                    
                    let celdas = filas[i].getElementsByTagName("td")
                    if(celdas[0].innerText == nombreEmpresa){
                        mostrarAlerta(" No se puede agregar, la empresa ya existe", "danger");
                        return false;
                    }
                }                            
            }
// aqui estamos creando un registro nuevo en la tabla , siempre y cuando pase las primeras validaciones
            row.innerHTML = `
            <td id="${nombreEmpresa}">${nombreEmpresa}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm editar">Editar</a> 
            <a href="#" class="btn btn-danger btn-sm borrar">Eliminar</a>`;

            lista.appendChild(row);

            let registrados = []
            for (let i = 1; i < filas.length; i++) {
                if(filas[i]){
                    let celdas = filas[i].getElementsByTagName("td")                    
                    let nEmpresa = celdas[0].innerText
                    registrados.push({"nombre": nEmpresa})
                }                            
            }

            localStorage.setItem("tbRegistrado", JSON.stringify(registrados))

            rowSeleccionada = null;
            mostrarAlerta("Empresa agregada", "success"); // aqui se muestra una alerta cuando el proceso fue efectivo y se logo añadir a la tabla
        }
        else{  // ** EDICION PRINCIPAL

            // Aqui const filas esta posicionando dentro del input nuestro objeto a modificar
            const filas = document.getElementsByTagName("tr")

            let datoEncontrado = false; // datoEncontrado lo usaremos como un break para cuando empezemos el recorrido y dentro del for cambie su valor este deje de ejecutarse

            for (let i = 1; i < filas.length; i++) { // recorremos el indice de filas
                if(filas[i]){
                    let celdas = filas[i].getElementsByTagName("td") // definimos que celdas sera igual a las filas en nuestro TD
                    if(datoEncontrado == false){ // condicionamos que nuestro datoEncontrado es falso
                        if(celdas[0].innerText == rowSeleccionada.children[0].innerText){ // SI celdas 
                            rowSeleccionada.children[0].innerText = nombreEmpresa
                            rowSeleccionada = null;
                            datoEncontrado = true;
                        }else{
                            console.log("No se encontro el valor")
                        } 
                    }                    
                }                            
            }
            let registrados = []
                for (let i = 1; i < filas.length; i++) {
                    if(filas[i]){
                        let celdas = filas[i].getElementsByTagName("td")                    
                        let nEmpresa = celdas[0].innerText
                        registrados.push({"nombre": nEmpresa})
                    }                            
                }
    
                localStorage.setItem("tbRegistrado", JSON.stringify(registrados))

            rowSeleccionada = null;
            mostrarAlerta("Empresa editada", "info");
        }
        
        borrarCampos();
    }

});


// EDITAMOS DATOS
document.querySelector("#registrados").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("editar")) {
        rowSeleccionada = target.parentElement.parentElement;
        document.querySelector("#empresa").value = rowSeleccionada.children[0].textContent; // Corrección aquí
    }
});







// BORRAMOS DATA

document.querySelector("#registrados").addEventListener("click", (e) => {
   target = e.target;
   if (target.classList.contains("borrar")){
    target.parentElement.parentElement.remove();
    
    const filas = document.getElementsByTagName("tr");
        
        let registrados = []
            for (let i = 1; i < filas.length; i++) {
                if(filas[i]){
                    let celdas = filas[i].getElementsByTagName("td")                    
                    let nEmpresa = celdas[0].innerText
                    registrados.push({"nombre": nEmpresa})
                }                            
            }

            localStorage.setItem("tbRegistrado", JSON.stringify(registrados))
    


    mostrarAlerta(" Empresa Eliminada", "danger");
   }
});
