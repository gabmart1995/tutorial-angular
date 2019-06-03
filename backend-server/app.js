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

// inicializacion de variables
var app = express();

// conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', ( error, response ) => {

    // si no se conecta a la base datos no hace nada y nos muestra el error
    if ( error ) throw error; 

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// rutas
app.get('/', (request, response, next) => {

    // OK => peticiones correctas
    response.status(200).json({
        ok: true,
        mensaje: 'peticion realizada correctamente'
    }); 
});

// escuchar peticiones y permite levantar el puerto seleccionado
app.listen(3000,  () => {
    console.log('Express Server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 
            'online');
});