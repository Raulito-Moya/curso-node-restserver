
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


const UserSchema =  Schema({
   username:{
        type: String,
        required: [true, 'The name is requiered']  //true: es requerido, 2do argumento: mensaje
    },
    email:{
        type:String,
        required: [true, 'th email is requiered'],
        unique: true //un solo correo electronico 
    },
    password:{
        type:String,
        required: [true, 'The password is requiered'],
        unique: true //un solo correo electronico 
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE', //exportacion por defecto
        
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    projects: {
        type: Array,
        default:[]
    }
});



UserSchema.methods.toJSON = function(){  //aqui modifico el metodo toJSON del Schema para que me retorne todo menos la __v y el password 
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id //modifico el id para que me retorne como uid
  return usuario
}

module.exports = model( 'User', UserSchema )