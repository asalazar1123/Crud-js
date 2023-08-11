window.onload = (event) => {   //Nuestro propósito principal es cargar y mostrar los datos almacenados en el LocalStorage en una tabla
    var tablaRegistrados = document.getElementById("registrados"); // obtiene los elementos de la tabla 
    var empresasGuardadas = localStorage.getItem("tbRegistrado"); // obtiene los datos dentro de LS

    if (empresasGuardadas) {  // aqui validamos si viene con información dentro de Local Storage

        let empresas = JSON.parse(empresasGuardadas); //Convierte los datos guardados (en formato JSON) en un objeto JavaScript

        let trRegistros = "";

        for (let i = 0; i < empresas.length; i++) { // SItera a través de los datos de las empresas y crea filas en la tabla con la información
            trRegistros = trRegistros + `
                <tr>
                    <td>${empresas[i].nombre}</td>
                    <td> <a href="#" class="btn btn-warning btn-sm editar">Editar</a> 
                        <a href="#" class="btn btn-danger btn-sm borrar">Eliminar</a></td>
                </tr>
            `
            tablaRegistrados.innerHTML = trRegistros; // Aqui actualizamos el contenido html de las tablas con la fila generada
        }        
    }
};

// ! AQUI DEFINIMOS NUESTRA VARIABLE GLOBAL

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




// ! BORRAMOS CAMPOS

function borrarCampos(){ // esta funcion es para dejar los campos vacios del input empresa en vacío, lo que limpia el campo de entrada para nuevos valores.
    document.querySelector("#empresa").value = ""; 
}


// ! AÑADIR DATOS

document.querySelector("#registro").addEventListener("submit", (e)=>{ // aqui al presionar el boton submit nos ejecutara el evento a definir
    e.preventDefault(); // prevenimos la recarga de página al apretar el submit
    
    const nombreEmpresa = document.querySelector("#empresa").value; //Obtiene el valor del campo de entrada con id "empresa"

    
    if( empresa.value == ""){
         mostrarAlerta("Porfavor ingresa el nombre de tu empresa para continuar" , "danger"); // Si el campo está vacío, muestra una alerta roja que diga ese mensaje
    }
    
    else{
        if(rowSeleccionada == null){ //Si rowSeleccionada es null, se agrega una nueva empresa.
            const lista = document.querySelector("#registrados");
            const row = document.createElement("tr");

            const filas = document.getElementsByTagName("tr")

            for (let i = 1; i < filas.length; i++) {
                if(filas[i]){                    
                    let celdas = filas[i].getElementsByTagName("td")
                    if(celdas[0].innerText == nombreEmpresa){
                        mostrarAlerta(" No se puede agregar, la empresa ya existe", "danger"); //recorremos las filas y si es que empresa ya existe en la tabla, muestra una alerta de peligro.
                        return false;
                    }
                }                            
            }

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
                    registrados.push({"nombre": nEmpresa}) // aqui estamos creando un registro nuevo en la tabla , siempre y cuando pase las primeras validaciones
                }                            
            }

            localStorage.setItem("tbRegistrado", JSON.stringify(registrados)) //aqui le indicamos que nos almacene en el localstorage la tabla "registrados" y nos de un JSON

            rowSeleccionada = null;
            mostrarAlerta("Empresa agregada", "success"); // aqui se muestra una alerta cuando el proceso fue efectivo y se logo añadir a la tabla
        }
        else{  // ! PROCESO DE EDITAR DATOS

           
            const filas = document.getElementsByTagName("tr")  // Aqui en esta parte lo que queremos es buscar una fila especifica dentro de la tabla y actualizarle su valor de celda

            let datoEncontrado = false; // Entonces datoEncontrado se utilizará para controlar si se ha encontrado el dato que estamos buscando y, si es así, detener el bucle for.

            for (let i = 1; i < filas.length; i++) { // Se inicia un bucle for que recorre todas las filas de la tabla empezando del 1 porque los 0 son encabezados
                if(filas[i]){ // verificamos si la fila actual existe 
                    let celdas = filas[i].getElementsByTagName("td") // si obtenemos celdas -> td <-- de la fila actual lo almacenamos en celdas
                    if(datoEncontrado == false){ // condicionamos que nuestro datoEncontrado es falso por lo cual aseguramos que el bucle se detiene en cuanto datoEncontrado sea falso
                        if(celdas[0].innerText == rowSeleccionada.children[0].innerText){ // Comparamos el contenido y si existe una coincidencia significaria que encontro el valor a editar  
                            rowSeleccionada.children[0].innerText = nombreEmpresa // por lo cual aqui actualizamos con el nuevo valor de nombreEmpresa
                            rowSeleccionada = null; // para indicar que ha terminado la edicion
                            datoEncontrado = true; // se finaliza el bucle
                        }else{
                            console.log("No se encontro el valor") // en caso de no encontrar valor este arroja alerta
                        } 
                    }                    
                }                            
            }
            let registrados = [] // crearemos un arreglo donde almacenaremos despues de editar datos , iniciamos un proceso similar al de arriba con el for solo que ahora queremos almacenarlo en un arreglo
                for (let i = 1; i < filas.length; i++) {
                    if(filas[i]){ // verificamos si existe y es valida
                        let celdas = filas[i].getElementsByTagName("td")  //obtenemos todas las celdas de la fila actual          
                        let nEmpresa = celdas[0].innerText //obtenemos el nombre empresa que seria el valor de la primera celda
                        registrados.push({"nombre": nEmpresa}) // agregamos un objeto con la clave nombre y el nombre actualizado
                    }                            
                }
    
                localStorage.setItem("tbRegistrado", JSON.stringify(registrados))

            rowSeleccionada = null;
            mostrarAlerta("Empresa editada", "info"); // muestra alerta si el proceso de edicion es exitoso
        }
        
        borrarCampos();
    }

});


// ! EDICION ---> ACCION 
document.querySelector("#registrados").addEventListener("click", (e) => { // definimos que al hacer click en EDITAR dentro de la tabla #registrados nos genere el siguiente evento
    target = e.target; // obtenemos el elemento HTML del evento y lo almacenamos 
    if (target.classList.contains("editar")) { //verificamos si el elemento target u objetivo html tiene la clase editar que esta dentro de la tabla
        rowSeleccionada = target.parentElement.parentElement; // Si se hizo clic, obtenemos la fila del boton y para eso se sube dos niveles en la jerarquía usando parentElement para llegar al elemento <tr> que contiene el botón.
        document.querySelector("#empresa").value = rowSeleccionada.children[0].textContent; // Una vez que se ha seleccionado la fila, se actualiza el valor del campo de entrada con id "empresa" con el contenido de la primera celda (<td>) de la fila seleccionada. Esto se hace utilizando textContent.
    }
});







// ! BORRAMOS DATA

document.querySelector("#registrados").addEventListener("click", (e) => { // Nuevamente generamos un evento pero al presionar el boton eliminar
   target = e.target;
   if (target.classList.contains("borrar")){
    target.parentElement.parentElement.remove();
    
    const filas = document.getElementsByTagName("tr");
        
        let registrados = []   // aqui generamos el proceso para tambien borrar el campo en el arreglo del local storage
            for (let i = 1; i < filas.length; i++) {
                if(filas[i]){
                    let celdas = filas[i].getElementsByTagName("td")                    
                    let nEmpresa = celdas[0].innerText
                    registrados.push({"nombre": nEmpresa}) 
                }                            
            }

            localStorage.setItem("tbRegistrado", JSON.stringify(registrados)) // aqui el valor se va al local storage
    


    mostrarAlerta(" Empresa Eliminada", "danger"); // mostramos alerta cuando se elimine dato
   }
});

