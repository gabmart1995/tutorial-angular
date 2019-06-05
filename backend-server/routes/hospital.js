// ==========================================
//		Rutas de hospital
// ==========================================

var express = require('express');
var mdAutenticacion = require('./../middlewares/autenticacion');

var app = express();  // variable del servidor

// importa los modelos
var Hospital = require('./../models/hospital');

// ==========================================
//		Obtiene los hospitales
// ==========================================

app.get('/', (request, response, next) => {

    Hospital.find({}, (error, hospitales) => {

        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al cargando los hospitales',
                errors: error  // muestra el error al programador
            });
        }

        // peticion aceptada => OK
        response.status(200).json({
            ok: true,
            hospitales: hospitales  // retorna todos los hospitales
        });
   });
});


// ==========================================
//		Crea un registro de  hospital
// ==========================================

app.post('/', (request, response) => {

    // recibe la informacion del formulario
    var body = request.body

    // crea el registro
    var hospital = new Hospital({
        nombre: body.nombre,
        img: body.img,
        usuario: body.usuario
    });

    hospital.save((error, hospitalGuardado) => {

        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: error
            });
        }

        // recurso creado => OK
        response.status(201).json({
            ok: true,
            hospital: hospitalGuardado
            // usuarioToken: request.usuario
        });
    });
});

// ==========================================
//		Modifica un registro de hospital
// ==========================================

app.patch('/:id', (request, response) => {

    var id = request.params.id;
    var body = request.body;

    Hospital.findById(id, (error, hospital) => {

        //verifica si esta en la BD
        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el hospital',
                errors: error
            });
        }

        // si no existe el registro
        if (!hospital) {
            return response.status(400).json({
                ok: false,
                mensaje: 'El hospital con el id: ' + id + ' no existe.',
                error: { message: 'no existe un hospital con ese ID' }
            });
        }

        // asigna los valores
        hospital.nombre = body.nombre;
        hospital.img = body.img;

        //salva los cambios
        hospital.save((error, hospitalGuardado) => {
            
            if (error) {
                return response.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar el usuario',
                    errors: error
                });
            }

            // recurso actulizado => OK
            response.status(200).json({
                ok: true,
                hospital: hospitalGuardado
            });
        });
    });

});

// ==========================================
//		Elimina un registro de hospital
// ==========================================

app.delete('/:id', (request, response) => {

    var id = request.params.id;

    Hospital.findByIdAndRemove(id, (error, hospitalBorrado) => {

        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al borrar hospital',
                errors : error
            });
        }

        if (!hospitalBorrado) {
            return response.status(400).json({
                ok: false,
                mensaje: 'No existe un hospital con ese id',
                errors: { message: 'No existe un hospital con ese id' }
            });
        }

        // recurso eliminado => OK
        response.status(200).json({
            ok: true,
            hospital: hospitalBorrado
        });
    });
});

// exporta el modulo
module.exports = app;