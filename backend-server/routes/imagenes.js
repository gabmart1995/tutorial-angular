var express = require('express');

var app = express();

// este path ya viene con node
const path = require('path');

// rutas
app.get('/:tipo/:img', (request, response, next) => {

    var tipo = request.params.tipo;
    var imagen = request.params.img;

    // __dirname permite especificar toda la ruta del archivo
    var pathImagen = path.resolve( __dirname, `` );



    // OK => peticiones correctas
    response.status(200).json({
        ok: true,
        mensaje: 'peticion realizada correctamente'
    }); 
});

module.exports = app;