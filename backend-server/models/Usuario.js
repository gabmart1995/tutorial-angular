var mongoonse = require('mongoose');

// Se definen los esquemas
var Schema = mongoonse.Schema;

// Esquema de la base de datos
var usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario']  },
    apellido: { type: String, required: [true, 'El apellido es necesario']  },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE' },

});

module.exports = mongoonse.model('Usuario', usuarioSchema);