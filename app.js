// Imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fileUpload = require('express-fileupload');require('dotenv').config();
require('ejs')

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
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

// Routes
app.use('/api', require('./routes/imagen.routes'));

//Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
    return res.status(404).render('404')
});


// Arrancar el servidor
app.listen(port, () => console.log(`Servidor en el puerto: ${port}`));