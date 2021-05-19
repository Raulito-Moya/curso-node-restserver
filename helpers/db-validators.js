const { Producto, Categoria } = require('../models');
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

const existeProductoPorId = async(id = '') => {
    
    const existeProducto = await Producto.findById(id)
    
    if ( !existeProducto ) {
        throw new Error(`El producto no existe: por ese Id`)
     }

}

const existeCategoriaPorId = async(id = '') => {
    
    const existeCategoria = await Categoria.findById(id)
    
    if ( !existeCategoria ) {
        throw new Error(`La categoria  no existe: por ese Id`)
     }

}


//validar colecciones permitidas
const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

  const incluida = colecciones.includes( coleccion );
  if ( !incluida ) {
     throw new Error(`La colecciones ${ coleccion } no es permitida, ${ colecciones }`)

  }

  return true  //si todo sale bien

}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeProductoPorId,
    existeCategoriaPorId,
    coleccionesPermitidas
    

}