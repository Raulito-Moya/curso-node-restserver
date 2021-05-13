const Role = require('../models/role')
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => { //custom recibe el argumento y lo tira en un callback
    const existeRol = await Role.findOne({ rol });  //aqui lo  que digo es que si el rol no existe en la bd que dispare un error
    if ( !existeRol ) {
       throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}


const emailExiste = async( correo = '' ) => {
    
   const existeEmail = await Usuario.findOne({ correo }) //va a buscar si existe el correo
    if ( existeEmail ) {
       throw new Error(`Ese correo: ${correo} ya esta registrado`)
    }

}

const existeUsuarioPorId = async( id = '' ) => {
   
    const existeUsuario = await Usuario.findById(id)
    if ( !existeUsuario ) {
       throw new Error(`El id no existe: ${ id } ya esta registrado`)
    }

}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}