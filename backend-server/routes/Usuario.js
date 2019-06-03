var express = require('express');
var app = express();

// importa los modelos
var Usuario = require('../models/Usuario');

// rutas
app.get('/', (request, response, next) => {

    /*
        Query de consulta recibe 2 parametros:

        1.- La consulta hacia la BD en formato JSON
        2.- Un callback que indica al usuario una existencia de un 
        error
    */

    Usuario.find({ }, (error, usuarios) => {

        if ( error ) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error cargando los usuarios',
                errors: error
            });
        }
        
         // OK => peticion correctas
        return response.status(200).json({
            ok: true,
            usuarios: usuarios
            });
    });

});

module.exports = app;