// ==========================================
//		Rutas de carga de archivos
// ==========================================

var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');

var app = express();

var Usuario = require('./../models/usuario');
var Medico = require('./../models/medico');
var Hospital = require('./../models/hospital');

//middleware de carga de archivos
app.use(fileUpload());

app.patch('/:tipo/:id', (request, response, next) => {

    var tipo = request.params.tipo;
    var id = request.params.id;

    // tipos de coleccion
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf( tipo ) < 0) {
        return response.status(400).json({
            ok: false,
            mensaje: 'Tipo de coleccion no es valido',
            errors: { message: 'Tipo de coleccion no es valida' }
        });
    }

    // valida si llegan archivos
    if (!request.files) {
        return response.status(400).json({
            ok: false,
            mensaje: 'No selecciono un archivo',
            errors: { message: 'Debe seleccionar una imagen' }
        });
    }

    // obtiene el nombre del archivo 
    var archivo = request.files.img;
    var nombreCortado = archivo.name.split('.');  // separa el nombre  en forma de arreglo
    var archivoExtension = nombreCortado[nombreCortado.length - 1];  // obtiene la extension

    // Solo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf( archivoExtension ) < 0 ) {
        return response.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            errors: { message: 'Las extensiones validas son: ' + extensionesValidas.join(", ") }
        });
    }

    // Nombre de archivo personalizado
    // 1231456.123.png formato
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ archivoExtension }`;

    // Mover a tu archivo temporal a un path
    var path = `./uploads/${ tipo }/${ nombreArchivo }`; 

    archivo.mv( path, error => {   
       
        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: error
            }); 
        }

        // ejecuta la subida del archivo
       subirPorTipo(tipo, id, nombreArchivo, response);

    }); 
});

function subirPorTipo(tipo, id, nombreArchivo, response) {

    if (tipo === 'usuarios') {

        Usuario.findById(id, (error, usuario) => {
            
            if (error) {
                return response.status(500).json({
                    ok: false,
                    mensaje: 'Error al consultar usuario',
                    errors: error
                });
            }

            // si no existe el registro dentro de la BD
            if (!usuario) {
                return response.status(400).json({
                    ok: false,
                    mensaje: 'Usuario no existe',
                    errors: { message: 'Usuario no existe' }
                });
            }
            
            var pathViejo = './uploads/usuarios/' + usuario.img;
            
            // Si existe, remueve la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync( pathViejo );
            }

            // almacena la imagen en la BD
            usuario.img = nombreArchivo;

            usuario.save((error, usuarioActualizado) => {
                
                usuarioActualizado.password = ':)';

                if (error) {
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Error al actualizar la imagen',
                        errors: error
                    });
                }

                return response.status(200).json({
                    ok: true,
                    mensaje: 'Imagen del usuario actualizada',
                    usuario: usuarioActualizado,
                    path: pathViejo
                });
            });
        });
    }

    else if (tipo === 'medicos') {

        Medico.findById(id, (error, medico) => {
            
            if (error) {
                return response.status(400).json({
                    ok: true,
                    mensaje: 'Error al buscar medico',
                    errors: error
                });
            }

            // si no existe el registro dentro de la BD
            if (!medico) {
                return response.status(400).json({
                    ok: false,
                    mensaje: 'Medico no existe',
                    errors: { message: 'Medico no existe' }
                });
            }

            var pathViejo = './uploads/medicos/' + medico.img;

            // Si existe remueve la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync( pathViejo );
            }

            medico.img = nombreArchivo;

            medico.save((error, medicoActualizado) => {

                if (error) {
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Error al actualizar la imagen',
                        errors: error
                    });
                }

                return response.status(200).json({
                    ok: true,
                    mensaje: 'Imagen del medico actualizada',
                    medico: medicoActualizado,
                    path: pathViejo
                });

            });
        });
    }

    else if (tipo === 'hospitales') {

        Hospital.findById(id, (error, hospital) => {

            if (error) {
                return response.status(400).json({
                    ok: true,
                    mensaje: 'Error al buscar hospital',
                    errors: error
                });
            }

            // si no existe el registro dentro de la BD
            if (!hospital) {
                return response.status(400).json({
                    ok: false,
                    mensaje: 'Hospital no existe',
                    errors: { message: 'Hospital no existe' }
                });
            }

            var pathViejo = './uploads/hospitales/' + hospital.img;

            // Si existe remueve la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync( pathViejo );
            }

            // alamcena la imagen en la variable
            hospital.img = nombreArchivo;

            hospital.save((error, hospitalActualizado) => {
               
                if (error) {
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Error al actualizar la imagen',
                        errors: error
                    });
                }

                return response.status(200).json({
                    ok: true,
                    mensaje: 'Imagen del hospital actualizada',
                    hospital: hospitalActualizado,
                    path: pathViejo
                });

            });
        });
    }
   
}

module.exports = app;