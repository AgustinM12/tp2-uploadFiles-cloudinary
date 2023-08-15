const formActualizarImagen = document.getElementById('formActualizarImagen');
const id = formActualizarImagen.dataset.id;

const nombre = document.getElementById('nombre')
const descripcion = document.getElementById('descripcion')
const archivo = document.getElementById("archivo")



document.addEventListener('DOMContentLoaded', async () => {
    // Traemos el registro que se va a editar
    const datos = await fetch(`/app/${id}`);
    const respuesta = await datos.json();

    // Mostrar en el formulario los respuesta del registro que se quiere actualizar
    nombre.value = respuesta.nombre;
    descripcion.value = respuesta.descripcion;
    archivo.src = respuesta.archivo
    
});


formActualizarImagen.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const respuesta = await fetch(`/app/${id}`, {
        method: 'PUT',
        body: formData
    });

    const datos = await respuesta.json();

    if (respuesta.status !== 201) {
        return Swal.fire({
            title: 'Error',
            text: datos.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }

    // Mostrar mensajes al usuario
    Swal.fire({
        title: 'Imagen actualizada',
        text: datos.message,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    })
    // Redireccionar al usuario
    setTimeout(() => {
        window.location.href = "/"
    }, 1500);
})