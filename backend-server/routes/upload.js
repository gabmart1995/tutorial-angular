// ==========================================
//		Rutas de carga de archivos
// ==========================================

var express = require('express');
var fileUpload = require('express-fileupload');

var app = express();

//middleware de carga de archivos
app.use(fileUpload());

// rutas
app.get('/', (request, response, next) => {

    // OK => peticiones correctas
    response.status(200).json({
        ok: true,
        mensaje: 'peticion realizada correctamente'
    }); 
});

module.exports = app;