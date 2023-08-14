const formActualizarImagen = document.getElementById('formActualizarImagen');
const id = formActualizarImagen.dataset.id;

const nombre = document.getElementById('nombre')
const descripcion = document.getElementById('descripcion')

// const imagenAntigua = document.getElementById("imagenAntigua")

// let imagenAcambiar = ""

// imagenAcambiar += 
// `
// <img src="${imagen}">
// `


document.addEventListener('DOMContentLoaded', async () => {
    // Traemos la reserva que se va a editar
    const datos = await fetch(`/app/${id}`);
    const respuesta = await datos.json();

    // Mostrar en el formulario los respuesta de la reserva que se quiere actualizar
    nombre.value = respuesta.nombre;
    descripcion.value = respuesta.descripcion;


});


formActualizarImagen.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const response = await fetch('/subirImagen', {
        method: 'POST',
        body: formData
    });

    reservaActualizada = {
        nombre: nombre.value,
        descripcion: descripcion.value,
    }

    // Se envían los nuevos datos al servidor express
    const respuesta = await fetch(`/app/${id}`, {
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
        window.location.href = "/"
    }, 1500);
})