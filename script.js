//Fase 1: Fecha actual - contador de tareas
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

//Fase 2: Ocultar y mostrar formulario
const botonTareas = document.querySelector("#nueva-tarea");
const formulario = document.querySelector(".formulario-nueva-tarea");

botonTareas.addEventListener("click", event => {
    if(formulario.style.display == "none"){
        formulario.style.display = "flex";
    }else{
        formulario.style.display = "none"
    }
})
//Fase 3: Agregar tareas
const formularioTarea = document.querySelector("#formulario-tareas");
const inputTareas = document.querySelector("#tarea-nueva");
const listaTareasPendientes = document.querySelector("#tareas-pendientes");

const agregarTarea = (event) => {
    event.preventDefault();

    const tarea = inputTareas.value;

    if (tarea.trim() === "") {
        return;
    }

    const li = document.createElement("li");
    const texto = document.createElement("span");
    const checkBox = document.createElement("input");

    texto.innerText = tarea;
    checkBox.type = "checkbox";

    checkBox.addEventListener("change", (event) => {
        if (event.target.checked) {
            texto.style.textDecoration = "line-through";
            contadorTareas--;
            cantidadTareas.innerText = `${contadorTareas} tareas pendientes`;
        } else {
            texto.style.textDecoration = "none";
            contadorTareas++;
            cantidadTareas.innerText = `${contadorTareas} tareas pendientes`;
        }
    });

    li.append(checkBox, texto);
    listaTareasPendientes.append(li);
    contadorTareas++;
    cantidadTareas.innerText = `${contadorTareas} tareas pendientes`;
};

    formularioTarea.addEventListener("submit", agregarTarea);
