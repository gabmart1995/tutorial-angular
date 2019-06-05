// ==========================================
//		Rutas de medico
// ==========================================

var express = require('express');
var mdAutenticacion = require('./../middlewares/autenticacion');

var app = express();  // variable del servidor

// se importa el modelo
var Medico = require('../models/medico');

// ==========================================
//		Obtiene todos los medicos
// ==========================================
app.get('/', (request, response, next) => {

    Medico.find({}, (error, medicos) => {

        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error cargando los medicos',
                errors: error
            });
        }

        response.status(200).json({
            ok: true,
            medicos: medicos
        });
    });
});


// ==========================================
//		Crea un registro de un medico
// ==========================================

// ==========================================
//		Actualiza el registro
// ==========================================

// ==========================================
//		Elimina un registro
// ==========================================