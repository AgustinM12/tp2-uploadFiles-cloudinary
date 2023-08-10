const formActualizarReserva = document.getElementById('formActualizarReserva');
const id = formActualizarReserva.dataset.id;

const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const dni = document.getElementById('dni')
const telefono = document.getElementById('telefono')
const fecha_salida = document.getElementById('fecha_salida')
const fecha_llegada = document.getElementById('fecha_llegada')
const costo = document.getElementById('costo')


document.addEventListener('DOMContentLoaded', async () => {
    // Traemos la reserva que se va a editar
    const datos = await fetch(`/api/app/${id}`);
    const respuesta = await datos.json();

    // Mostrar en el formulario los respuesta de la reserva que se quiere actualizar
    nombre.value = respuesta.nombre;
    apellido.value = respuesta.apellido;
    dni.value = respuesta.dni;
    telefono.value = respuesta.telefono;
    fecha_salida.value = respuesta.fecha_salida;
    fecha_llegada.value = respuesta.fecha_llegada;
    costo.value = respuesta.costo;

});


formActualizarReserva.addEventListener('submit', async (e) => {
    e.preventDefault();

    reservaActualizada = {
        nombre: nombre.value,
        apellido: apellido.value,
        dni: dni.value,
        telefono: telefono.value,
        fecha_salida: fecha_salida.value,
        fecha_llegada: fecha_llegada.value,
        costo: costo.value
    }


    // Se envían los nuevos datos al servidor express
    const respuesta = await fetch(`/api/app/${id}`, {
        method: 'PUT',
        body: JSON.stringify(reservaActualizada),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const datos = await respuesta.json();

    if (respuesta.status !== 200) {
        return Swal.fire({
            title: 'Error',
            text: datos.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }



    // Mostrar mensajes al usuario
    Swal.fire({
        title: 'Reserva actualizada',
        text: datos.message,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    })
    // Redireccionar al usuario
    setTimeout(() => {
        window.location.href = "/api"
    }, 1500);
})