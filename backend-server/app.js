/* 
    Este archivo corresponde al punto de entrada de 
    la aplicacion desde la entrada del servidor y muchas cosas
    mas

    NOTAS:
    Requires es una importacion de librerias ya sea de terceros o
    personalizadas que ocupamos para que funcione algo.
*/

// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');

// inicializacion de variables del servidor
var app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Peticion de datos (Desde caulquier lugar)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS"); // tipos de peticiones
    next();
});

// inicializacion del body parser con opciones y obtencion de JSON
// x-www-form-urlencoded de Postman
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configuracion de las rutas
app.use('/medico', medicoRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/imagenes', imagenesRoutes);

app.use('/', appRoutes);

// conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', ( error, response ) => {

    if ( error ) throw error; 
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

// escucha las peticiones y levanta el servidor en el puerto seleccionado
app.listen(3000,  () => {
    console.log('Express Server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 
            'online');
});