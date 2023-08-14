const Imagen = require('../models/Imagen');
const cloudinary = require("../utils/cloudinary")
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
    res.render('editarImagen', { id });
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
            message: 'Error al obtener la imagen'
        })
    }
}

// Cargar una imagen
ctrlImg.cargarImagen = async (req, res) => {
    console.log("Llegue");
    const {
        nombre,
        descripcion,
    } = req.body;

    try {

        const image = req.files.image;
        console.log(image)
        console.log("req.body: ", req.body)
        console.log("req.files:", req.files)


        const result = await cloudinary.uploader.upload(image.tempFilePath, {
            public_id: `${Date.now()}`,
            resource_type: "auto",
            folder: "images"
        })

        let imageUrl = result.secure_url;
        console.log("URL de la imagen subida:", imageUrl);

        const cargarImagen = new Imagen({
            nombre,
            descripcion,
            archivo: imageUrl
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

// Actualizar una imagen 
ctrlImg.editarImagen = async (req, res) => {

    try {
        const { id } = req.params;
        const registro = await Imagen.findByPk(id);
        await registro.update(req.body)

        const image = req.files.image
        console.log("req.files: ", req.files)

        const result = await cloudinary.uploader.upload(image.tempFilePath, {
            public_id: `${Date.now()}`,
            resource_type: "auto",
            folder: "images"
        })

        let imageUrl = result.secure_url;
        console.log("URL de la imagen subida:", imageUrl);

        const cargarImagen = new Imagen({
            archivo: imageUrl
        })

        await cargarImagen.save();

        return res.status(201).json({
            message: "Imagen actualizada exitosamente"
        })

    } catch (error) {
        console.log('Error al actualizar imagen', error);
        return res.status(500).json({ message: 'Error al actualizar la imagen' })
    }
}


// Eliminar una registro de forma lógica
ctrlImg.eliminarImagen = async (req, res) => {
    const { id } = req.params;
    try {
        const registro = await Imagen.findByPk(id);
        await registro.destroy();
        return res.json({ message: 'Imagen eliminada correctamente' })
    } catch (error) {
        console.log('Error al eliminar la imagen', error);
        return res.status(500).json({
            message: 'Error al eliminar la imagen'
        })
    }
}


module.exports = ctrlImg;