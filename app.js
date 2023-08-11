// Imports
import express from 'express';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fileUpload from 'express-fileupload';

import dotenv from ("dotenv").config()
import ejs from "ejs" ;

// require('dotenv').config();
// require('ejs')


//Se prueba la conexion a la base de datps
const { conectarDB } = require('./database');
conectarDB();

const port = process.env.PORT || 5000

const app = express();

// Middlewares
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024 }
}));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/imagen.routes'));

//Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
    return res.status(404).render('404')
});

// Arrancar el servidor
app.listen(port, () => console.log(`Servidor en el puerto: ${port}`));