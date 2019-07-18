var express = require('express');

var app = express();

// modelos
var Hospital = require('./../models/hospital');
var Medico = require('./../models/medico');
var Usuario = require('./../models/usuario');

// ==========================================
//		Busqueda especifica
// ==========================================
app.get('/coleccion/:tabla/:busqueda', (request, response) => {

    // se recibe los 2 parametros
    var tabla = request.params.tabla;
    var busqueda = request.params.busqueda; 
     
    var regex = new RegExp(busqueda, 'i');
    var promesa;

    //valida el dato alamcenado en la tabla
    switch (tabla) {

        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex); 
        break;

        case 'medicos':
            promesa = buscarMedicos(busqueda, regex);
        break;

        case 'hospitales':
            promesa = buscarHospitales(busqueda, regex)
        break;

        default: 
            return response.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda son: usuarios, medicos y hospitales',
                error: { message: 'tipo de tabla/coleccion no valida' }
            });
    }

    //verifica si se ejecuta la promesa
    promesa.then(data => {
        response.status(200).json({
            ok: false,
            [tabla]: data
        });
    });

});

// ==========================================
//      Busqueda General		
// ==========================================

app.get('/todo/:busqueda', (request, response, next) => {

    /*
        Ten cuidado con el query de consulta debido a que 
        son muy sensibles a las mayusculas y minusculas 
        para solucionarlo debes implementar expresiones regulares
        con la clase RegExp()

        NOTA: el segundo parametro corresponde a una opcion que la
        hace insensible a mayusculas y minusculas.

        Para mostrar todas las consultas dentro del mismo archivo se 
        utiliza los llamados procesos asincronos asignados a una promesa
    */

    var busqueda = request.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    // Ejecucion de promesas
    Promise.all([
                buscarHospitales(busqueda, regex), 
                buscarMedicos(busqueda, regex),
                buscarUsuarios(busqueda, regex)
            ])
            .then(respuestas => {
                response.status(200).json({
                    ok: true,
                    hospitales: respuestas[0],
                    medicos: respuestas[1],
                    usuarios: respuestas[2]
            });

        });  // devuelve los hospitales
});


function buscarHospitales(busqueda, regex) {
    
    return new Promise((resolve, reject) => {

         // Query de busqueda
        Hospital.find({ nombre: regex })
            .populate('usuario', 'nombre email img')
            .exec( (error, hospitales) => {
        
                if (error) {
                    //cancela la promesa
                    reject('Error al cargar hospitales', error);
                }
                else {
                    //manda la data de los hospitales
                    resolve(hospitales);
                }
            }); 
    });
}

function buscarMedicos(busqueda, regex) {
    
    return new Promise((resolve, reject) => {

         // Query de busqueda
        Medico.find({ nombre: regex })
            .populate('usuario', 'nombre email img')
            .populate('hospital')
            .exec((error, medicos) => {
        
                if (error) {
                    //cancela la promesa
                    reject('Error al cargar medicos', error);
                }
                else {
                    //manda la data de los hospitales
                    resolve(medicos);
                }
            });
    });
}

function buscarUsuarios(busqueda, regex) {
    
    return new Promise((resolve, reject) => {
        
        Usuario.find({}, 'nombre email rol img')
                .or([ { 'nombre': regex }, { 'email':  regex }  ])
                .exec((error, usuarios) => {
                    
                    if (error) {
                        reject('Error al cargar usuarios', error);
                    }
                    else {
                        resolve(usuarios);
                    }
                });
    });
}

module.exports = app;