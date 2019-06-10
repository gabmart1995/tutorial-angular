// ==========================================
//		Rutas de login
// ==========================================

var express = require('express');
var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken'); // se JWT
var SEED = require('./../config/config').SEED; // se obtiene la semilla del token

// Google auth
var CLIENT_ID = require('../config/config').CLIENT_ID;
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

var app = express();

//modelos
var Usuario = require('./../models/usuario');

// ==========================================
//		Autenticacion por Google
// ==========================================
async function verify(token) {
    
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });

    const payload = ticket.getPayload();
   
    // se retorna la informacion del usuario formato JSON
    return {
        nombre: payload.name, 
        email: payload.email,
        img: payload.picture,
        google: true
    }
  }

app.post('/google', async(request, response) => {
    
    var token = request.body.token;

    //ejecuta la funcion de promesa y debe retornar un usuario
    var googleUser = await verify(token)
            .catch(error => {
                return response.status(403).json({
                    ok: false,
                    mensaje: 'Token no valido',
                    errors: error
                });
            });

    // toma los datos y busca al usuario
    Usuario.findOne({ email: googleUser.email }, (error, usuarioBD) => {

        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el usuario',
                errors: error
            });
        }

        if (usuarioBD) {
            
            // si el usuario no posee cuenta en Google 
            if (usuarioBD.google === false) {
                return response.status(400).json({
                    ok: false,
                    mensaje: 'Debe utilizar su autenticacion normal' 
                });
            }
            else {  // Genera el nuevo token
                
                var token = jwt.sign({ usuario: usuarioBD }, SEED,
                    { expiresIn: 14400 });  //expira en 4 horas

                // OK => peticion correcta.
                response.status(200).json({
                    ok: true,
                    usuario: usuarioBD,
                    token: token,
                    id: usuarioBD._id  // envia el id
                });
            }
        }
        else {
            // el usuario no existe hay que crearlo ...
            var usuario = new Usuario();
            
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = googleUser.google;
            usuario.password = ':)';

            usuario.save((error, usuarioBD) => {

                if (error) {
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Error al crear el usuario',
                        errors: error
                    });
                }

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
        }
    });
    


  /*  response.status(200).json({
        ok: true,
        mensaje: 'OK!!',
        googleUser: googleUser,
    });*/
});


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