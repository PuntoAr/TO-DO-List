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
const tareas = [];

// para el selector de categorias
const selectorCategoria = document.querySelector("#categoriaSelect");

// Para el selector de prioridad
const selectorPrioridad = document.querySelector("#prioridadSelect");

// Para el selector de fecha
const selectorFecha = document.querySelector("#selectFecha");

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

function crearElementoTarea(tarea){

    // Creo la lista de tareas
    const li = document.createElement("li");
    li.classList.add("tarea");
    li.dataset.id = tarea.id;

    const texto = document.createElement("span");
    texto.classList.add("textoTarea");
    texto.innerText = tarea.texto;

    // Elegir categoria
    const textoCategoria = document.createElement("p");
    textoCategoria.classList.add("textoCategoria");
    textoCategoria.innerText = tarea.categoria;
    li.dataset.categoria = tarea.categoria;

    // Elegir prioridad
    const textoPrioridad = document.createElement("p");
    textoPrioridad.classList.add("textoPrioridad");
    textoPrioridad.innerText = tarea.prioridad;
    li.dataset.prioridad = tarea.prioridad;

    coloresPrioridad(textoPrioridad, tarea.prioridad);

    // Elegir fecha
    const fechaTexto = document.createElement("span");
    fechaTexto.classList.add("fechaTexto");
    actualizarEstadoFecha(tarea.fecha, fechaTexto)
    li.dataset.fecha = tarea.fecha;

    //Checkbox de tareas
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkbox");
    checkBox.checked = tarea.completada;

    checkBox.addEventListener("change", (event) => {
        tarea.completada = event.target.checked;
        if (event.target.checked) {
            texto.style.textDecoration = "line-through";
            fechaTexto.classList.remove("fechaVencida");
            contadorTareas--;
            cantidadTareas.innerText = `${contadorTareas} tareas pendientes`;
            listaTareasCompletadas.append(li);
        } else {
            texto.style.textDecoration = "none";
            actualizarEstadoFecha(tarea.fecha, fechaTexto)
            contadorTareas++;
            cantidadTareas.innerText = `${contadorTareas} tareas pendientes`;
            listaTareasPendientes.append(li);
            ordenarPorPrioridad();
        }
    });

    // Editar Tarea
    const botonEditar = document.createElement("button");
    botonEditar.classList.add("botonEditar");
    botonEditar.innerText = "Editar";

    botonEditar.addEventListener("click", (event) => {
        tareaEdicion = tarea.id;
        inputTareas.value = tarea.texto;
        selectorCategoria.value = tarea.categoria;
        selectorPrioridad.value = tarea.prioridad;
        selectorFecha.value = tarea.fecha;
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
        const indiceTarea = tareas.findIndex((tareaArray) => {
            return tareaArray.id === tarea.id;
        })
        if(indiceTarea !== -1){
            tareas.splice(indiceTarea, 1);
        }

        li.remove();
    })

    // Creo un contenedor de textos
    const divText = document.createElement("div");
    divText.classList.add("textoTareaCategoria");
    divText.append(texto, textoCategoria, fechaTexto);

    // Agrego todos los elementos a la lista
    li.append(checkBox, divText, botonEditar, botonEliminar,  textoPrioridad);
    return li;
}
// --------- Agregar tareas -------
const agregarTarea = (event) => {
    event.preventDefault();

    // Partes de cada tarea
    const tarea = inputTareas.value;
    const categoria = selectorCategoria.value;
    const prioridad = selectorPrioridad.value;
    const fecha = selectorFecha.value;


    if (tarea.trim() === "" || categoria.trim() === "" || prioridad.trim() === "") {
        return;
    }

    const nuevaTarea = {
        id: Date.now(), //Obtene fecha y hora actual en forma de numero
        texto: tarea,
        categoria: categoria,
        prioridad: prioridad,
        fecha: fecha,
        completada: false
    };


    // Parte de Editar Tareas
    if(tareaEdicion != null){
        const tareaEncontrada = tareas.find((tareaArray) =>
            tareaArray.id === tareaEdicion);
        tareaEncontrada.texto = tarea;
        tareaEncontrada.categoria = categoria;
        tareaEncontrada.fecha = fecha;
        tareaEncontrada.prioridad = prioridad;
        const liViejo = document.querySelector(`li[data-id="${tareaEdicion}"]`);
        if(liViejo){
            liViejo.remove();
        }
        const elementoEditado = crearElementoTarea(tareaEncontrada);
        listaTareasPendientes.append(elementoEditado);
        ordenarPorPrioridad();
        limpiarFormulario();
        botonAgregar.innerText = "Agregar";
        tareaEdicion = null;
        return;
    }
    tareas.push(nuevaTarea);
    // Agrego todos loe elementos a la lista
    const elementoTarea= crearElementoTarea(nuevaTarea);
    listaTareasPendientes.append(elementoTarea);

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
