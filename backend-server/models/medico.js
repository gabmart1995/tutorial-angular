// ==========================================
//		Modelo de medico
// ==========================================

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var medicoSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    img: { type: String, required: false },

    // relaciones    
    hospital: {
        type: Schema.Types.ObjectId, 
        ref: 'Hospital', 
        required: [true, 'El id hospital es un campo obligatorio'] 
    },

    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    }
}, { collection: 'medicos' });

module.exports = mongoose.model('Medico', medicoSchema);