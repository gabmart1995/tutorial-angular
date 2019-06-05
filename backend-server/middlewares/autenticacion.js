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


