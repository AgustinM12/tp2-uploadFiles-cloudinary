const formNuevaReserva = document.getElementById('formNuevaReserva')

formNuevaReserva.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value
    const descripcion = document.getElementById('descripcion').value


    const imagen = {
        nombre,
        descripcion,
    }


    const respuesta = await fetch('/subirImagen', {
        method: 'POST',
        body: JSON.stringify(imagen),
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (respuesta.status !== 201) {
        return Swal.fire({
            title: '¡Error!',
            text: 'Hubo un error al momento de subir la imagen',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    } else {

        const datos = await respuesta.json()

        Swal.fire({
            title: 'Imagen subida exitosamente!',
            text: datos.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        setTimeout(() => {
            window.location.href = '/index'
        }, 1500)
    }
});