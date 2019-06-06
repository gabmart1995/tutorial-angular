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

    // Populate permite obtener registros de otras tablas
    // se especifican 2 parametros: el primero corresponde a la
    // tabla que se quiere relacional y el segundo son los campos que deseas mostrar 

    var desde = request.query.desde || 0;
    desde = Number(desde);

    Hospital.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')  
        .exec((error, hospitales) => {

            if (error) {
                return response.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargando los hospitales',
                    errors: error  // muestra el error al programador
                });
            }

            Hospital.count({}, (error, conteo) => {

                if (error) {
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Error contando los hospitales',
                        errors: error
                    });
                }

                 // peticion aceptada => OK
                response.status(200).json({
                    ok: true,
                    hospitales: hospitales,  // retorna todos los hospitales
                    totalRegistros: conteo
                });
            });
        });
});


// ==========================================
//		Crea un registro del hospital
// ==========================================

app.post('/', mdAutenticacion.verificarToken, (request, response) => {

    // recibe la informacion del formulario
    var body = request.body

    // crea el registro
    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: request.usuario._id
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
            hospital: hospitalGuardado,
        });
    });
});

// ==========================================
//		Actualiza un registro de hospital
// ==========================================

app.patch('/:id', mdAutenticacion.verificarToken, (request, response) => {

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
        hospital.usuario = request.usuario._id;

        //salva los cambios
        hospital.save((error, hospitalGuardado) => {
            
            if (error) {
                return response.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar hospital',
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

app.delete('/:id', mdAutenticacion.verificarToken, (request, response) => {

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