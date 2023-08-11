const formNuevaImagen = document.getElementById('formNuevaImagen')

formNuevaImagen.addEventListener('submit', async (e) => {
    e.preventDefault();

   /*  const nombre = document.getElementById("nombre").value
    const descripcion = document.getElementById("descripcion").value
    const image = document.getElementById("image").files */

    const formData = new FormData(e.target);
    // formData.append("nombre", nombre);
    // formData.append("descripcion", descripcion);
    // formData.append("image", image.files[0]);

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