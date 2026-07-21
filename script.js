//Fecha actual - contador de tareas
const fechas = new Date();
const numeroDia = fechas.getDate();
const dia = fechas.getDay();
const mes = fechas.getMonth();
// Uso arrays, ya que se obtiene numeros de lo anterior
const dias = ["Domingo", "Lunes" ,"Martes" ,"Miercoles" ,"Jueves" ,"Viernes" ,"Sabado"]
const meses = ["enero", "febrero" ,"Marzo" ,"Abril" ,"Mayo" ,"Junio" ,"Julio" ,"Agosto" ,"Septiembre" ,"Octubre" ,"Noviembre" ,"Diciembre"];

//Muestro en la pagina
let fechaPagina = document.querySelector('#fecha');
fechaPagina.innerText = "Hoy • " + dias[dia] +" "+ numeroDia + " de " + meses[mes];
// Contador de tareas
const cantidadTareas = document.querySelector('#cantidad-tareas-pendientes');
let contadorTareas = 0;
cantidadTareas.innerText = contadorTareas + " tareas pendientes";

// Ocultar y mostrar formulario
const botonTareas = document.querySelector("#nueva-tarea");
const formulario = document.querySelector(".formulario-nueva-tarea");

// Esconde o muestra el formulario
const alternarFormulario = () =>{
    if(formulario.style.display == "none"){
        formulario.style.display = "flex";
    }else{
        formulario.style.display = "none"
    }
}
botonTareas.addEventListener("click", event => {
    alternarFormulario();
})
//Agregar tareas
const formularioTarea = document.querySelector("#formulario-tareas");
const inputTareas = document.querySelector("#tarea-nueva");
const listaTareasPendientes = document.querySelector("#tareas-pendientes");

const limpiarFormulario = () => {
    formularioTarea.reset();
};

let tareaEdicion = null;

// Filtro tareas completadas
const listaTareasCompletadas = document.querySelector("#tareas-completadas");
const botonVistaHoy = document.querySelector("#vista-hoy");
const botonVistaCompletadas = document.querySelector("#vista-completadas");
const seccionPendientes = document.querySelector(".lista-pendientes");
const seccionCompletadas = document.querySelector(".lista-completadas");

// Por defecto
seccionPendientes.style.display = "block";
seccionCompletadas.style.display = "none";
botonVistaHoy.classList.add("activo");
botonVistaCompletadas.classList.remove("activo");

botonVistaHoy.addEventListener("click", event => {
    seccionPendientes.style.display = "block";
    seccionCompletadas.style.display = "none";
    botonVistaHoy.classList.add("activo");
    botonVistaCompletadas.classList.remove("activo");

})
botonVistaCompletadas.addEventListener("click", event => {
    seccionCompletadas.style.display = "block";
    seccionPendientes.style.display = "none";
    botonVistaCompletadas.classList.add("activo");
    botonVistaHoy.classList.remove("activo");
})

// --------- Agregar tareas -------
const agregarTarea = (event) => {
    event.preventDefault();

    const tarea = inputTareas.value;

    if (tarea.trim() === "") {
        return;
    }

    // Parte de Editar Tareas
    if(tareaEdicion != null){
        tareaEdicion.innerText = tarea;
        tareaEdicion = null;
        limpiarFormulario();
        return;
    }

    const li = document.createElement("li");
    li.classList.add("tarea");
    const texto = document.createElement("span");
    texto.classList.add("textoTarea");
    texto.innerText = tarea;

    //Checkbox de tareas
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkbox");
    checkBox.addEventListener("change", (event) => {
        if (event.target.checked) {
            texto.style.textDecoration = "line-through";
            contadorTareas--;
            cantidadTareas.innerText = `${contadorTareas} tareas pendientes`;
            listaTareasCompletadas.append(li);
        } else {
            texto.style.textDecoration = "none";
            contadorTareas++;
            cantidadTareas.innerText = `${contadorTareas} tareas pendientes`;
            listaTareasPendientes.append(li);
        }
    });

    // Editar Tarea

    const botonEditar = document.createElement("button");
    botonEditar.classList.add("botonEditar");
    botonEditar.innerText = "Editar";

    botonEditar.addEventListener("click", (event) => {
        tareaEdicion = texto;
        inputTareas.value = texto.innerText;
        formulario.style.display = "flex";
        inputTareas.focus();
    })

    //Eliminar Tarea
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("botonEditar");
    botonEliminar.innerText = "Eliminar";

    botonEliminar.addEventListener("click", (event) => {
        if(!checkBox.checked){
            contadorTareas--;
            cantidadTareas.innerText = `${contadorTareas} tareas pendientes`;
        }
        li.remove();
    })


    li.append(checkBox, texto, botonEditar, botonEliminar);
    listaTareasPendientes.append(li);
    contadorTareas++;
    cantidadTareas.innerText = `${contadorTareas} tareas pendientes`;
    limpiarFormulario();
};

// Filtro completadas

formularioTarea.addEventListener("submit", agregarTarea);
const botonCancelar = document.querySelector("#cancelar-tarea");

botonCancelar.addEventListener("click", event => {
    tareaEdicion = null;
    tareaEdicion = null;
    limpiarFormulario();
    formulario.style.display = "none";
})
