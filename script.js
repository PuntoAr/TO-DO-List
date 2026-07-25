//Fecha actual
const fechas = new Date();
const numeroDia = fechas.getDate();
const dia = fechas.getDay();
const mes = fechas.getMonth();
const anio = fechas.getFullYear();
const fechaHoy = `${anio}-${String(mes + 1).padStart(2, "0")}-${String(numeroDia).padStart(2, "0")}`;
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
    if(formulario.style.display === "none"){
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
let fechaEdicion = null;

// Filtro tareas completadas
const listaTareasCompletadas = document.querySelector("#tareas-completadas");
const botonVistaTodas = document.querySelector("#vista-todas");
const botonVistaCompletadas = document.querySelector("#vista-completadas");
const seccionPendientes = document.querySelector(".lista-pendientes");
const seccionCompletadas = document.querySelector(".lista-completadas");
const seleccionBoton = document.querySelectorAll(".seleccionBoton");

function tareasPendientes(){
    const tareasPendientes = listaTareasPendientes.querySelectorAll(".tarea");
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
activarBoton(botonVistaTodas);

botonVistaTodas.addEventListener("click", event => {
    seccionPendientes.style.display = "block";
    seccionCompletadas.style.display = "none";
    activarBoton(botonVistaTodas);
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
    const elementosTarea = listaTareasPendientes.querySelectorAll(".tarea");

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
    const tareas = listaTareasPendientes.querySelectorAll(".tarea");
    const arrayTareas = Array.from(tareas);

    arrayTareas.sort((tareaA, tareaB) =>{
        return valorPrioridad[tareaA.dataset.prioridad]-valorPrioridad[tareaB.dataset.prioridad];
    });

    for(const tarea of arrayTareas){
        listaTareasPendientes.append(tarea);
    }
}

botonVistaUniversidad.addEventListener("click", event => {
    seccionPendientes.style.display = "block";
    seccionCompletadas.style.display = "none";
    activarBoton(botonVistaUniversidad);
    filtrarCategoria("Universidad")

})

botonVistaTrabajo.addEventListener("click", event => {
    seccionPendientes.style.display = "block";
    seccionCompletadas.style.display = "none";
    activarBoton(botonVistaTrabajo);
    filtrarCategoria("Trabajo")
})

botonVistaPersonal.addEventListener("click", event => {
    seccionPendientes.style.display = "block";
    seccionCompletadas.style.display = "none";
    activarBoton(botonVistaPersonal);
    filtrarCategoria("Personal")
})

// Funcion cambio de color prioridad
function coloresPrioridad(textoPrioridad, prioridad){
    textoPrioridad.classList.remove(
        "textoPrioridadAlta",
        "textoPrioridadMedia",
        "textoPrioridadBaja"
    );

    if(prioridad === "Alta"){
        textoPrioridad.classList.add("textoPrioridadAlta");
    }else if(prioridad === "Media"){
        textoPrioridad.classList.add("textoPrioridadMedia");
    }else{
        textoPrioridad.classList.add("textoPrioridadBaja");
    }
}
// Filtro de fechas proximas
const botonVistaProximas = document.querySelector("#vista-proximas");

function filtrarProximas(){
    const elementosTarea = listaTareasPendientes.querySelectorAll(".tarea");
    elementosTarea.forEach(elementoTarea => {
        const fechaTarea = elementoTarea.dataset.fecha;
        if(fechaTarea > fechaHoy){
            elementoTarea.style.display = "flex";
        }else{
            elementoTarea.style.display = "none";
        }
    })

}

botonVistaProximas.addEventListener("click", event => {
    seccionPendientes.style.display = "block";
    seccionCompletadas.style.display = "none";
    activarBoton(botonVistaProximas);
    filtrarProximas();
})

// Fitro de fecha Hoy
const botonVistaHoy = document.querySelector("#vista-hoy");

function filtrarHoy(){
    const elementosTarea = listaTareasPendientes.querySelectorAll(".tarea");
    elementosTarea.forEach(elementoTarea => {
        const fechaTarea = elementoTarea.dataset.fecha;
        if(fechaTarea !== "" && fechaTarea <= fechaHoy){
            elementoTarea.style.display = "flex";
        }else{
            elementoTarea.style.display = "none";
        }
    })

}

botonVistaHoy.addEventListener("click", event => {
    seccionPendientes.style.display = "block";
    seccionCompletadas.style.display = "none";
    activarBoton(botonVistaHoy);
    filtrarHoy();

})
const botonAgregar = document.querySelector("#agregar-tarea");

// Mejora visual de fecha
function cambiarFecha(fecha){
    if(fecha.trim() === ""){
        return "";
    }
    const partes = fecha.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Fechas vencidas
function actualizarEstadoFecha(fecha, fechaTexto){
    if(fecha.trim() === ""){
        fechaTexto.innerText = "";
        fechaTexto.classList.remove("fechaVencida");
        return;
    }
    if(fecha < fechaHoy){
        fechaTexto.innerText = `Vencida: ${cambiarFecha(fecha)}`;
        fechaTexto.classList.add("fechaVencida");
    }else{
        fechaTexto.innerText = `Fecha: ${cambiarFecha(fecha)}`;
        fechaTexto.classList.remove("fechaVencida");
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

    // Para el selector de fecha
    const selectorFecha = document.querySelector("#selectFecha");
    const fecha = selectorFecha.value;

    if (tarea.trim() === "" || categoria.trim() === "" || prioridad.trim() === "") {
        return;
    }

    // Parte de Editar Tareas
    if(tareaEdicion != null){
        tareaEdicion.innerText = tarea;
        categoriaEdicion.innerText = categoria;
        prioridadEdicion.innerText = prioridad;
        actualizarEstadoFecha(fecha, fechaEdicion);
        liEdicion.dataset.categoria = categoria;
        liEdicion.dataset.prioridad = prioridad;
        liEdicion.dataset.fecha = fecha;
        coloresPrioridad(prioridadEdicion,prioridad);
        ordenarPorPrioridad();
        limpiarFormulario();
        tareaEdicion = null;
        categoriaEdicion = null;
        prioridadEdicion = null;
        fechaEdicion = null;
        liEdicion = null;
        botonAgregar.innerText = "Agregar";
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
            fechaTexto.classList.remove("fechaVencida");
            contadorTareas--;
            cantidadTareas.innerText = `${contadorTareas} tareas pendientes`;
            listaTareasCompletadas.append(li);
        } else {
            texto.style.textDecoration = "none";
            actualizarEstadoFecha(li.dataset.fecha, fechaTexto)
            contadorTareas++;
            cantidadTareas.innerText = `${contadorTareas} tareas pendientes`;
            listaTareasPendientes.append(li);
            ordenarPorPrioridad();
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

    // Elegir fecha
    const fechaTexto = document.createElement("span");
    fechaTexto.classList.add("fechaTexto");
    actualizarEstadoFecha(fecha, fechaTexto)
    li.dataset.fecha = fecha;

    // Editar Tarea
    const botonEditar = document.createElement("button");
    botonEditar.classList.add("botonEditar");
    botonEditar.innerText = "Editar";

    botonEditar.addEventListener("click", (event) => {
        tareaEdicion = texto;
        categoriaEdicion = textoCategoria;
        prioridadEdicion = textoPrioridad;
        fechaEdicion = fechaTexto;
        liEdicion = li;
        inputTareas.value = texto.innerText;
        selectorCategoria.value = li.dataset.categoria;
        selectorPrioridad.value = li.dataset.prioridad;
        selectorFecha.value = li.dataset.fecha;
        botonAgregar.innerText = "Guardar"
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
    divText.append(texto, textoCategoria, fechaTexto);

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
    categoriaEdicion = null;
    prioridadEdicion = null;
    fechaEdicion = null;
    liEdicion = null;
    botonAgregar.innerText = "Agregar";
    limpiarFormulario();
    formulario.style.display = "none";
})
