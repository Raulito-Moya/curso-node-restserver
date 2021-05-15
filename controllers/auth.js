const { response } = require("express");
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require("../helpers/generar-JWT");


const login = async(req, res = response) => {

  const { correo, password } = req.body

   try {

      //verificar si el email existe
       const usuario = await Usuario.findOne({ correo })
      if ( !usuario ) {
          return res.status(400).json({
            msg: 'Usuario / Password no son correctos -correo'
          })
       } 



      // si el usuario esta activo
      if ( !usuario.estado ) {
        return res.status(400).json({
          msg: 'Usuario / Password no son correctos -estado: false'
        })
     } 

      // verificar la contrasena
       const validPassword = bcryptjs.compareSync( password, usuario.password ); //comparar y hacer match
        if ( !validPassword ) {
         return res.status(400).json({
           msg: 'Usuario / Password no son correctos -password'
         })
        }


      // Generar el JWT
      const token = await generarJWT( usuario.id );
    
      
    res.json({
      msg: 'Login ok',
      usuario:{
       usuario
      },
      token
     }) 

   } catch (error) {
     console.log(error);
      return res.status(500).json({
        msg: 'Hable con el administador'
      })
   }


 

}

module.exports = {
  login
}