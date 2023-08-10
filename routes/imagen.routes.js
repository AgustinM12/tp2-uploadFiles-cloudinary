// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores

const router = require('express').Router();

const {
RenderObtenerImagenes,
RenderCargarImagenes,
RenderEditarImagenes,
cargarImagen,
obtenerImagenes,
obtenerUnaImagen,
editarImagen,
eliminarImagen

} = require('../controllers/imagen.controllers')

// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Obtener todas las reservas
router.get('/index', RenderObtenerImagenes)

// Formulario para crear una reserva
router.get('/subirImagen', RenderCargarImagenes)

// Formulario para actualizar una reserva
router.get('/actualizarImagen/:id', RenderEditarImagenes)


// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
router.get('/app/', obtenerImagenes);
 
// Crear una reserva
router.post('/subirImagen', cargarImagen);

router.get('/app/:id', obtenerUnaImagen);
 
// Actualizar una reserva
router.put('/app/:id', editarImagen);
 
// Eliminar una reserva de forma lógica
router.delete('/app/:id', eliminarImagen);
;

 
 module.exports = router;