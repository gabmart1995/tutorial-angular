var express = require('express');

var app = express();

// este path ya viene con node
const path = require('path');
const fs = require('fs');

// rutas
app.get('/:tipo/:img', (request, response, next) => {

    var tipo = request.params.tipo;
    var img = request.params.img;

    // __dirname permite especificar toda la ruta del archivo
    // el segundo parametro es lo que se quiere concatenar a dirname
    var pathImagen = path.resolve( __dirname, `./../uploads/${ tipo }/${ img }`);

    // verificar si la imagen existe
    if (fs.existsSync(pathImagen)) {
        response.sendFile( pathImagen );
    }
    else {
        var pathNoImage = path.resolve( __dirname, './../assets/no-img.jpg');
        response.sendFile(pathNoImage);
    }
});

module.exports = app;