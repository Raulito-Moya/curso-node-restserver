
/*{
  nombre: 'idsjfidsjf',
  correo: 'fsdfsfs',
  password: 'fsdfdsfdf',
  img: 'sdadasd',
  rol: 'skfsfks',
  estado: true, 
  google: true
}*/

const {Schema, model} = require('mongoose')


const UsuarioSchema =  Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']  //true: es requerido, 2do argumento: mensaje
    },
    correo:{
        type:String,
        required: [true, 'El correro es obligatorio'],
        unique: true //un solo correo electronico 
    },
    password:{
        type:String,
        required: [true, 'La contrsena es obligatorio'],
        unique: true //un solo correo electronico 
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});



UsuarioSchema.methods.toJSON = function(){  //aqui modifico el metodo toJSON del Schema para que me retorne todo menos la __v y el password 
  const { __v, password, ...usuario } = this.toObject();
  return usuario
}

module.exports = model( 'Usuario', UsuarioSchema )