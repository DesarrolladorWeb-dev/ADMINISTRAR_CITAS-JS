// Campos del formulario
const mascotaInput = document.querySelector('#mascota')
const propietarioInput = document.querySelector('#propietario')
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const sintomasInput = document.querySelector('#sintomas')

//UI
const formulario = document.querySelector('#nueva-cita')
const contenedorCitas = document.querySelector('#citas')

let editando;

// clases
class Citas {
    constructor(){
        this.citas = []
    }
    agregarCita(cita){
        this.citas = [...this.citas, cita]
        console.log(this.citas)
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }
    eliminarCita(id){
        this.citas = this.citas.filter(cita  => cita.id != id )
        
    }
    
}
class UI{
    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')
        // Agregar clase en base al tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success')
            
        }
        // Mensaje de error
        divMensaje.textContent = mensaje
        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'))
        // Quitar la alerta despues de 5 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }
    imprimirCitas({citas}){
        this.limpiarHTML()
        citas.forEach(cita => {
            const {id, mascota,propietario,telefono,fecha,hora,sintomas} = cita
           
            const divCita = document.createElement('div')
            divCita.classList.add('cita','p-3')
            divCita.dataset.id = id
            // scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2')
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder')
            mascotaParrafo.textContent = mascota
            const propietarioParrafo = document.createElement('p')
            propietarioParrafo.innerHTML = `
            <span class = "font-weight-bolder"> Propietario: </span> ${propietario}`
            const telefonoParrafo = document.createElement('p')
            telefonoParrafo.innerHTML = `
            <span class = "font-weight-bolder"> Telefono: </span> ${telefono}`
            const fechaParrafo = document.createElement('p')
            fechaParrafo.innerHTML = `
            <span class = "font-weight-bolder"> Propietario: </span> ${fecha}`
            const horaParrafo = document.createElement('p')
            horaParrafo.innerHTML = `
            <span class = "font-weight-bolder"> Propietario: </span> ${hora}`
            const sintomasParrafo = document.createElement('p')
            sintomasParrafo.innerHTML = `
            <span class = "font-weight-bolder"> Sintomas: </span> ${sintomas}`

            // creacion del boton eliminar 
            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2')
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>`
            btnEliminar.onclick = ()=> eliminarCita(id);
            // creacion del boton editar
            const btnEditar = document.createElement('button');
            btnEditar.onclick = () => cargarEdicion(cita); // la cita completa porque requiero editar todo

            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'



            // Agrefar los parrafos el divCita
            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fechaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)



            // agregar las citas al HTML
            contenedorCitas.appendChild(divCita)
            
            
        });
    }
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)

        }
    }
}
const ui = new UI();
const administradorCitas = new Citas();



eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input', datosCita)
    propietarioInput.addEventListener('input', datosCita)
    telefonoInput.addEventListener('input', datosCita)
    fechaInput.addEventListener('input', datosCita)
    horaInput.addEventListener('input', datosCita)
    sintomasInput.addEventListener('input', datosCita)

    formulario.addEventListener('submit' , nuevaCita)
}

// Objeto informacion de citas
const citaObj = {
    mascota: '',
    propietario: '',
    telefono:'',
    fecha: '',
    hora : '',
    sintomas: ''

}
// Agregar objeto de Cita
function datosCita(e) {  
    citaObj[e.target.name] = e.target.value
    // se ejecuta para obtener todo los datos de los input y luego guardarlo en el objeto
    console.log("objeto para editar". citaObj)
}

function nuevaCita(e) {

    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if( mascota === '' || propietario === '' || telefono === '' || fecha === ''  || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los mensajes son Obligatorios', 'error')

        return;
    }

    if(editando){
        administradorCitas.editarCita( {...citaObj} );

        ui.imprimirAlerta('Editado Correctamente ')
    //    Pasar el objeto de la cita a edicioon
        formulario.querySelector('button[type = "submit"]').textContent = "Crear Cita"
        // Quita el modo edicion
        editando = false
         // Estamos editando


   
    }else{
        citaObj.id = Date.now();
        // si no envias una copia con esto {... obj} , tomas la referencia del objeto  
        // y todo los objetos guardados en el array tienen una referencia de el original entonces cambias 
        // la referencia , todos los objetos dentro del array tendran los mismos valores porque son una referencia
        administradorCitas.agregarCita({...citaObj}) 
        ui.imprimirAlerta('Se agrego correctamente')
    

    }

  

    // Reiniciar el objeto para el formulario
    reiniciarObjeto();
    formulario.reset();
    // como ya lo guardo en el objeto todo lo que se a escrito al momento de que se hace un reset aun tiene valores el obj
    
    //Mostrar el html para las citas
    ui.imprimirCitas(administradorCitas)
        
    
}

function reiniciarObjeto() {
    citaObj.mascota = ''
    citaObj.propietario = ''
    citaObj.telefono = ''
    citaObj.fecha = ''
    citaObj.hora = ''
    citaObj.sintomas = ''


}
function eliminarCita(id) {
    // console.log(id)
    administradorCitas.eliminarCita(id)
    ui.imprimirAlerta('La cita se elimino correctamente') // se imprimina sin pasar por error 
    ui.imprimirCitas(administradorCitas)// mostrara otra ves todos los elementos

}
function cargarEdicion(cita){
    const {mascota , propietario, telefono, fecha,hora ,sintomas,id} = cita

    // llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;
    // Llenar el objeto que esta vacio
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas  = sintomas;
    citaObj.id = id; 

// cambiar el texto del boton
formulario.querySelector('button[type = "submit"]').textContent = "Guardar Cambios"

    editando = true
    

}