// ==========================================
//		Modelo de hospitales
// ==========================================

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hospitalSchema = new Schema({
    
    nombre: { type: String, required: [true, 'El nombre es necesario']},
    img: { type: String, required: false },

    //conexion con las claves foraneas
    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario' 
    }
},

// esta propiedad indica que va conectarse a ese modelo creado en la base de datos
{ collection: 'hospitales' });

// exporta el modelo
module.exports = mongoose.model('Hospital', hospitalSchema);