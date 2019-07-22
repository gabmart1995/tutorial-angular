var express = require('express');
var bcrypt = require('bcrypt');

// se importa el middleware
var mdAutenticacion = require('./../middlewares/autenticacion');

var app = express();

// importacion de los modelos
var Usuario = require('../models/usuario');

/*
    Query de consulta recibe 2 parametros:

    1.- La consulta hacia la BD en formato JSON
    2.- Que campos del registro JSON quieres mostrar
    3.- Un callback que indica al usuario una existencia de un 
    error. Va dentro de la funcion exec
    En este caso pide a la base de datos que se traiga todos los elementos
    de la base de datos

    Limite actua con un paginador de de la informacion
*/

// ==========================================
//		Obtiene todos los usuarios
// ==========================================
app.get('/', (request, response, next) => {

   // crea un query desde la URL y le asigna un valor entero
    var desde = request.query.desde || 0;

    desde = Number(desde);  //parsea el elemento a un numero

    Usuario.find({ }, 'nombre email img rol google')
                .skip(desde)  // crea un punto de referencia 
                .limit(5)  // muestra 5 usuarios por pagina  
                .exec((error, usuarios) => {

                        // falla interna de la BD
                        if ( error ) {
                            return response.status(500).json({
                                ok: false,
                                mensaje: 'Error cargando los usuarios',
                                errors: error // manda el error
                            });
                        }

                        // Obtiene el total de los usuarios
                        Usuario.count({}, (error, conteo) => {
                            
                            if (error) {
                                return response.status(500).json({
                                    ok: false,
                                    mensaje: 'Error contando los usuarios',
                                    errors: error
                                });
                            }

                            // OK => peticion correcta.
                            response.status(200).json({
                                ok: true,
                                usuarios: usuarios,
                                totalRegistros: conteo
                            });
                        }); 
                
                });
});

// ==========================================
//		Actualizar usuario
// ==========================================
app.patch('/:id', [ mdAutenticacion.verificarToken, mdAutenticacion.verificarADMIN_MismoUsuario ], (request, response) => {

    // Params permite obtener la ultima referencia de la direccion url
    var id = request.params.id;
    var body = request.body;

    Usuario.findById(id, (error, usuario) => {

        //si no existe en la BD
        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: error
            });
        }

        // si el usuario esta vacio
        if (!usuario) {
            return response.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id: ' + id + ' no existe',
                error: { message: 'no existe un usuario con ese ID' }
            });
        }

        //asigna los nuevos valores
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.rol = body.rol; 

        // guarda los cambios
        usuario.save((error, usuarioGuardado) => {

            if (error) {
                return response.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el usuario',
                    errors: error
                });
            }
            
            // muestra una carita feliz con la contraseña
            usuarioGuardado.password = ':)';

             // Recurso actualizado => OK
            response.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            }); 
        });
    });
});

// ==========================================
//		Crear usuario
// ==========================================
app.post('/', (request, response) => {

    //recibe la informacion del formulario y la almacema en la variable
    var body = request.body;

    // Crea un nuevo registro y encripta la contraseña
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password:  bcrypt.hashSync(body.password, 10),          
        img: body.img,
        rol: body.rol
    });

    // guardamos los cambios
    usuario.save( (error, usuarioGuardado) => {
        
        if (error) {
            return response.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: error
            });
        }

        // Recurso creado => OK
        response.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: request.usuario // imprime el token del que genera la peticion
        }); 
    });
});

// ==========================================
//		Eliminar usuario por id
// ==========================================

app.delete('/:id', [ mdAutenticacion.verificarToken, mdAutenticacion.verificarADMIN_ROLE ], (request, response) =>{

    var id = request.params.id;

    Usuario.findByIdAndRemove(id, (error, usuarioBorrado) => {

        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al borrar al usuario',
                errors: error
            });
        }

        if (!usuarioBorrado) {
            return response.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe un usuario con ese id' }
            });
        }
        
        // Recurso eliminado => OK
        response.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        }); 
    });
});


module.exports = app;