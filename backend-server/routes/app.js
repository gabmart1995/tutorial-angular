var express = require('express');

var app = express();

// rutas
app.get('/', (request, response, next) => {

    // OK => peticiones correctas
    response.status(200).json({
        ok: true,
        mensaje: 'peticion realizada correctamente'
    }); 
});

module.exports = app;