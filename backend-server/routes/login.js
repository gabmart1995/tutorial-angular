var express = require('express');
var bcrypt = require('bcrypt');

var app = express();

//modelos
var Usuario = require('./../models/usuario');

// ==========================================
//		Validacion del login
// ==========================================

app.post('/', (request, response) => {
    
    var body = request.body;

    // valida si la entrada es valida
    Usuario.findOne({ email: body.email }, (error, usuarioBD) => {

        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: error
            });
        }

        if (!usuarioBD) {
            return response.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - email',
                errors: error
            }); 
        }

        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            return response.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - password',
                errors: error
            }); 
        }

        // CREAR EL TOKEN JWT

         // OK => peticion correcta.
        response.status(200).json({
            ok: true,
            usuario: usuarioBD,
            id: usuarioBD._id  // envia el id
        });
    });
});

module.exports = app;