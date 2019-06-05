// ==========================================
//		Rutas de login
// ==========================================

var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken'); // se importan los servicios

// se obtiene la semilla del token
var SEED = require('./../config/config').SEED;

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

        // compara las contraseñas y devuelve un valor booleano 
        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            return response.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - password',
                errors: error
            }); 
        }

        // CREAR EL TOKEN JWT (Parametros)
        // payload: corresponde a la firma del token que contiene los datos del usuario.
        // SEED: el segundo parametro es algo que hace unico al token 
        // fecha de expiracion: corresponde a la fecha de expiracion del token

        usuarioBD.password = ':)';
        var token = jwt.sign({ usuario: usuarioBD }, SEED,
                            { expiresIn: 14400 });  //expira en 4 horas

         // OK => peticion correcta.
        response.status(200).json({
            ok: true,
            usuario: usuarioBD,
            token: token,
            id: usuarioBD._id  // envia el id
        });
    });
});

module.exports = app;