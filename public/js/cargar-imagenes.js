const formNuevaImagen = document.getElementById('formNuevaImagen')

formNuevaImagen.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const respuesta = await fetch('/subirImagen', {
        method: 'POST',
        body: formData
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
            window.location.href = '/'
        }, 1500)
    }
});