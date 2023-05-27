const { Schema, model} = require("mongoose");


const ProjectSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    user: {
        type: Schema.Types.ObjectId, //va a ser otro objeto que tnemos en mongo
        ref: 'User', //para mantener la referencia ese objectId va a apuntar a Usuario
        required: true  //requiered en true pa todas las categorias tinen q tener un usuario
    },
    description: { type: String },
    date:{ type: Date,
        requiered:true
    },
    completed:{type:Boolean, default:false},
    img: { type: String }

});


 ProjectSchema.methods.toJSON = function(){  //aqui modifico el metodo toJSON del Schema para que me retorne todo menos la __v  
    const { __v,   ...data } = this.toObject();
    return data
  }

module.exports = model( 'Project', ProjectSchema)
