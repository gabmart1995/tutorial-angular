// se importa la libreria JWT
var jwt = require('jsonwebtoken');

// se obtiene la semilla del token
var SEED = require('./../config/config').SEED;

// ==========================================
//		Verificar token JWT
// ==========================================

// exporta la funcion de verificacion
exports.verificarToken = function(request, response, next) {

     // manda el token por la URL
    var token = request.query.token;
    
     // se necesita verificar si el token es valido
    jwt.verify(token, SEED, (error, decoded) => {
 
        if (error) {
            return response.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: error
            });
        }

        // envia los datos al request de la siguiente funcion
        request.usuario = decoded.usuario;

         // continua con el proceso
         next();
    });
};

// ==========================================
//		Verificar ADMIN
// ==========================================

// exporta la funcion de verificacion
exports.verificarADMIN_ROLE = function(request, response, next) {

    var usuario = request.usuario;

    if ( usuario.rol === 'ADMIN_ROLE' ) {

        next();
        return;
    } 

    else {
        return response.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });
    }
};

// ==========================================
//		Verificar ADMIN o Mismo Usuario
// ==========================================

// exporta la funcion de verificacion
exports.verificarADMIN_MismoUsuario = function(request, response, next) {

    var usuario = request.usuario;
    var id = request.params.id;

    if ( usuario.rol === 'ADMIN_ROLE' || usuario._id === id ) {

        next();
        return;
    } 

    else {
        return response.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto',
            errors: { message: 'No es administrador, ni es el mismo usuario' }
        });
    }
};


