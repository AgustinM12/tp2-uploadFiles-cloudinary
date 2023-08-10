const Imagen = require('../models/Imagen');
const ctrlImg = {};

// RENDERIZAR VISTAS
ctrlImg.RenderObtenerImagenes = (req, res) => {
    res.render('index'); 
};

ctrlImg.RenderCargarImagenes = (req, res) => {
    res.render('subirImagen');
};

ctrlImg.RenderEditarImagenes = (req, res) => {
   const { id } = req.params;
    res.render('actualizarImagen', { id });
};


//         Rutas para CRUD 
ctrlImg.obtenerImagenes = async (req, res) => {
    try {
        const imagenes = await Imagen.findAll({
        });
        return res.json(imagenes);
    } catch (error) {
        console.log('Error al obtener las imagenes', error);
        return res.status(500).json({
            message: "Error al obtener imagenes"
        })
    }
}

// Obtener una imagen
ctrlImg.obtenerUnaImagen = async (req, res) => {
    try {
        const { id } = req.params;
        const registro = await Imagen.findByPk(id);
        return res.json(registro);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error al obtener la usuario'
        })
    }
}


// Crear un registro
ctrlImg.cargarImagen = async (req, res) => {
    const {
        nombre,
        descripcion,
    } = req.body;


    try {
        const cargarImagen = new Imagen({
            nombre,
            descripcion,
        });

        // los manda a la DB
        await cargarImagen.save();

        return res.status(201).json({
            message: "Imagen subida exitosamente"
        })
    } catch (error) {
        console.log('Error al subir una imagen', error)

        return res.status(500).json({
            message: 'Error al subir una imagen'
        })
    }
}

// Actualizar una registro
ctrlImg.editarImagen = async (req, res) => {
    try {
        const { id } = req.params;
        const registro = await Imagen.findByPk(id);
        await registro.update(req.body)
        return res.json({message: 'Imagen editada correctamente'});
    } catch (error) {
        console.log('Error al actualizar imagen', error);
        return res.status(500).json({message: 'Error al actualizar la imagen'})
    }
}


// Eliminar una registro de forma lógica
ctrlImg.eliminarImagen = async (req, res) => {
    const { id } = req.params;
    try {
        const registro = await Imagen.findByPk(id);
        await registro.update({ estado: false });
        return res.json({ message: 'registro eliminada correctamente'})
    } catch (error) {
        console.log('Error al eliminar la registro', error);
        return res.status(500).json({
            message: 'Error al eliminar la registro'})
    }
}


module.exports = ctrlImg;