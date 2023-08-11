// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores

import { validationSchema } from '../middlewares/validationSchema';
import { createUserSchema } from '../validation/form.schema';

const router = require('express').Router();

import {
    RenderObtenerImagenes,
    RenderCargarImagenes,
    RenderEditarImagenes,
    cargarImagen,
    obtenerImagenes,
    obtenerUnaImagen,
    editarImagen,
    eliminarImagen
} from '../controllers/imagen.controllers'
// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Obtener todas las reservas
router.get('/', RenderObtenerImagenes)

// Formulario para crear una reserva
router.get('/subirImagen', RenderCargarImagenes)

// Formulario para actualizar una reserva
router.get('/actualizarImagen/:id', RenderEditarImagenes)

// ==========================================
//         Rutas para CRUD 
// ==========================================

// Obtener todas las reservas
router.get('/app/', obtenerImagenes);

// Crear un registro
router.post('/subirImagen', createUserSchema, validationSchema, cargarImagen);

router.get('/app/:id', obtenerUnaImagen);

// Actualizar una reserva
router.put('/app/:id', editarImagen);

// Eliminar una reserva de forma lógica
router.delete('/app/:id', eliminarImagen);

module.exports = router;