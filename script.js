//Fecha actual
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

const limpiarFormulario = () => {
    formularioTarea.reset();
};

// Agregar tareas
const formularioTarea = document.querySelector("#formulario-tareas");
const inputTareas = document.querySelector("#tarea-nueva");
const listaTareasPendientes = document.querySelector("#tareas-pendientes");


// Editar tareas
let tareaEdicion = null;
let categoriaEdicion = null;
let liEdicion = null;
let prioridadEdicion = null;

// Filtro tareas completadas
const listaTareasCompletadas = document.querySelector("#tareas-completadas");
const botonVistaHoy = document.querySelector("#vista-hoy");
const botonVistaCompletadas = document.querySelector("#vista-completadas");
const seccionPendientes = document.querySelector(".lista-pendientes");
const seccionCompletadas = document.querySelector(".lista-completadas");
const seleccionBoton = document.querySelectorAll(".seleccionBoton");

function tareasPendientes(){
    const tareasPendientes = document.querySelectorAll(".tarea");
    tareasPendientes.forEach(tareasPendiente => {
        tareasPendiente.style.display = "flex";
    });
}

function activarBoton(botonSeleccionado){
    seleccionBoton.forEach(boton=>{
        boton.classList.remove("activo");
    })
    botonSeleccionado.classList.add("activo");
}
// Por defecto
seccionPendientes.style.display = "block";
seccionCompletadas.style.display = "none";
activarBoton(botonVistaHoy);

botonVistaHoy.addEventListener("click", event => {
    seccionPendientes.style.display = "block";
    seccionCompletadas.style.display = "none";
    activarBoton(botonVistaHoy);
    tareasPendientes();

})
botonVistaCompletadas.addEventListener("click", event => {
    seccionCompletadas.style.display = "block";
    seccionPendientes.style.display = "none";
    activarBoton(botonVistaCompletadas);
})
// Filtro de Castegorias
const botonVistaUniversidad = document.querySelector("#vista-universidad");
const botonVistaTrabajo = document.querySelector("#vista-trabajo");
const botonVistaPersonal = document.querySelector("#vista-personal");


function filtrarCategoria(categoria){
    const elementosTarea = document.querySelectorAll(".tarea");

    elementosTarea.forEach(elementoTarea => {
        if (elementoTarea.dataset.categoria === categoria) {
            elementoTarea.style.display = "flex";
        } else {
            elementoTarea.style.display = "none";
        }
    });
}

// Ordenar Prioridad
const valorPrioridad = {
    Alta: 1,
    Media: 2,
    Baja: 3
};
function ordenarPorPrioridad(){
    const tareas = document.querySelectorAll(".tarea");
    const arrayTareas = Array.from(tareas);

    arrayTareas.sort((tareaA, tareaB) =>{
        return valorPrioridad[tareaA.dataset.prioridad]-valorPrioridad[tareaB.dataset.prioridad];
    });

    for(const tarea of arrayTareas){
        listaTareasPendientes.append(tarea);
    }
}

botonVistaUniversidad.addEventListener("click", event => {
    activarBoton(botonVistaUniversidad);
    filtrarCategoria("Universidad")

})

botonVistaTrabajo.addEventListener("click", event => {
    activarBoton(botonVistaTrabajo);
    filtrarCategoria("Trabajo")
})

botonVistaPersonal.addEventListener("click", event => {
    activarBoton(botonVistaPersonal);
    filtrarCategoria("Personal")
})

// Funcion cambio de color prioridad
function coloresPrioridad(textoPrioridad, prioridad){
    textoPrioridad.classList.remove("textoPrioridadAlta",
        "textoPrioridadMedia", "textoPrioridadBaja");

    if(prioridad === "Alta" ){
        textoPrioridad.classList.add("textoPrioridadAlta");
    }else if(prioridad === "Media" ){
        textoPrioridad.classList.add("textoPrioridadMedia");
    }else{
        textoPrioridad.classList.add("textoPrioridadBaja");
    }
}

// --------- Agregar tareas -------
const agregarTarea = (event) => {
    event.preventDefault();

    const tarea = inputTareas.value;
    // para el selector de categorias
    const selectorCategoria = document.querySelector("#categoriaSelect");
    const categoria = selectorCategoria.value;

    // Para el selector de prioridad
    const selectorPrioridad = document.querySelector("#prioridadSelect");
    const prioridad = selectorPrioridad.value;

    if (tarea.trim() === "") {
        alert("Ingrese una tarea.");
        return;
    }

    if (categoria === ""){
        alert("Seleccione una categoria.");
        return;
    }

    // Parte de Editar Tareas
    if(tareaEdicion != null){
        tareaEdicion.innerText = tarea;
        categoriaEdicion.innerText = categoria;
        prioridadEdicion.innerText = prioridad;
        liEdicion.dataset.categoria = categoria;
        liEdicion.dataset.prioridad = prioridad;
        tareaEdicion = null;
        coloresPrioridad(prioridadEdicion,prioridad);
        limpiarFormulario();
        return;
    }

    // Creo la lista de tareas
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

    // Elegir categoria
    const textoCategoria = document.createElement("p");
    textoCategoria.classList.add("textoCategoria");
    textoCategoria.innerText = categoria;
    li.dataset.categoria = categoria;

    // Elegir prioridad
    const textoPrioridad = document.createElement("p");
    textoPrioridad.classList.add("textoPrioridad");
    textoPrioridad.innerText = prioridad;
    li.dataset.prioridad = prioridad;

    coloresPrioridad(textoPrioridad, prioridad);

    // Editar Tarea
    const botonEditar = document.createElement("button");
    botonEditar.classList.add("botonEditar");
    botonEditar.innerText = "Editar";

    botonEditar.addEventListener("click", (event) => {
        tareaEdicion = texto;
        categoriaEdicion = textoCategoria;
        prioridadEdicion = textoPrioridad;
        liEdicion = li;
        inputTareas.value = texto.innerText;
        selectorCategoria.value = li.dataset.categoria;
        selectorPrioridad.value = li.dataset.prioridad;
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

    // Creo un contenedor de textos
    const divText = document.createElement("div");
    divText.classList.add("textoTareaCategoria");
    divText.append(texto, textoCategoria);

    // Agrego todos los elementos a la lista
    li.append(checkBox, divText, botonEditar, botonEliminar,  textoPrioridad);
    listaTareasPendientes.append(li);


    contadorTareas++;
    cantidadTareas.innerText = `${contadorTareas} tareas pendientes`;
    limpiarFormulario();
    ordenarPorPrioridad();
};

// Boton Agregar
formularioTarea.addEventListener("submit", agregarTarea);
const botonCancelar = document.querySelector("#cancelar-tarea");

// Boton Cancelar
botonCancelar.addEventListener("click", event => {
    tareaEdicion = null;
    tareaEdicion = null;
    limpiarFormulario();
    formulario.style.display = "none";
})
