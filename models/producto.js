
const { Schema, model} = require("mongoose");


const ProductoSchema = Schema({
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
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    description: { type: String },
    disponible: { type: Boolean, default: true},
    img: { type: String }

});


 ProductoSchema.methods.toJSON = function(){  //aqui modifico el metodo toJSON del Schema para que me retorne todo menos la __v  
    const { __v,   ...data } = this.toObject();
    return data
  }

module.exports = model( 'Producto', ProductoSchema)
