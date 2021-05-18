const { Schema, model} = require("mongoose");


const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId, //va a ser otro objeto que tnemos en mongo
        ref: 'Usuario', //para mantener la referencia ese objectId va a apuntar a Usuario
        required: true  //requiered en true pa todas las categorias tinen q tener un usuario
    }

});


CategoriaSchema.methods.toJSON = function(){  //aqui modifico el metodo toJSON del Schema para que me retorne todo menos la __v  
    const { __v,   ...data } = this.toObject();
    return data
  }

module.exports = model( 'Categoria', CategoriaSchema)