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

app.put('/:tipo/:id', (request, response, next) => {

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

    //obtiene el nombre del archivo 
    var archivo = request.files.imagen;
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
    
    /*return response.status(200).json({
        ok: false,
        id: id,
        nombre: nombreArchivo,
        tipo : tipo
    });*/

    if (tipo === 'usuarios') {

        Usuario.findById(id, (error, usuario) => {
            
           if (error) {
                return response.status(500).json({
                    ok: false,
                    mensaje: 'Error al subir el archivo',
                    errors: error
                });
            }

            // se necesita el path viejo que permite comparar si la 
            // imagen esta subida al servidor
            var pathViejo = './upload/usuarios/' + usuario.img;

            // Si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            //asigna el nuevo valor y lo guarda
            usuario.img = nombreArchivo;

            usuario.save((error, usuarioActualizado) => {
                
                if (error) {
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Error al actualizar el archivo',
                        errors: error
                    });
                }
                
                // OK => peticion correcta
                return response.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                });
            });
        });
    }
    else if (tipo === 'medicos') {

    }
    else if (tipo === 'hospitales') {
    }



}

module.exports = app;