const obtenerDatos = async () => {
    //SE SOLICITAN LAS RESERVAS AL SERVIDOR
    const datos = await fetch('/app', {
        method: 'GET'
    });

    const imagenes = await datos.json();
    return imagenes;
}



//CARGAR LAS imagenes EN LA TABLA
const mostrarImagenes = (imagenes, tablaElement) => {
    let registros = '';
    imagenes.forEach(imagen => {
        registros += `
          <tr>
               <td>${imagen.nombre}</td>
               <td>${imagen.descripcion}</td>
               <td><img src="${imagen.archivo}" alt="${imagen.archivo} width = "250" height = "250"
               "></td>
               <td>
               <div class="row">
               <a href="/actualizar-imagen/${imagen.id}" class="btn btn-sm btn-warning">Editar</a>
               <button class="btn btn-danger btn-sm" data-id="${imagen.id}" onClick=eliminarImagen(event)>Eliminar</button>
               </div>
               </td>
          </tr>
        `
    })

    tablaElement.innerHTML = registros;

};


//ELIMINAR UNA imagen
const eliminarImagen = async (e) => {
    console.log(e)
    const id = e.target.dataset.id;

    const resultado = await Swal.fire({
        title: '¿Está seguro de eliminar la imagen?',
        text: "¡No podras deshacer este cambio!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    })

    if (!resultado.isConfirmed) {
        return;
    }

    const respuesta = await fetch(`/app/${id}`, {
        method: 'DELETE',
    })

    const datos = await respuesta.json();

    if (respuesta.status !== 200) {
        Swal.fire({
            title: 'Error',
            text: datos.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    } else {
        Swal.fire({
            title: 'Imagen eliminada correctamente',
            text: datos.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
    }
        // Redireccionar al usuario

    setTimeout(() => {
        window.location.href = "/"
    }, 1500);
};


document.addEventListener('DOMContentLoaded', async () => {
    // Mostrar las imagenes en la tabla
    const tbody = document.getElementById('listaDeImagenes');
    const imagenes = await obtenerDatos() // undefined si no obtenerDatos no retorna nada
    mostrarImagenes(imagenes, tbody)

});