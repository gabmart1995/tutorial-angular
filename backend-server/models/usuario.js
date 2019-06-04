var mongoonse = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// Se definen los esquemas
var Schema = mongoonse.Schema;

/*
    {VALUE}: obtiene el valor almacenado en el campo.
    {PATH}: obtiene la clave del esquema
*/

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permtido'
};

// Esquema de la base de datos
var usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario']  },
    apellido: { type: String, required: [true, 'El apellido es necesario']  },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String, required: false },
    rol: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }

});

// agrega un mensaje personalizado al campo unique definido en el esquema
usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico' } );

// exporta el esquema
module.exports = mongoonse.model('Usuario', usuarioSchema);