const { response } = require("express");
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require("../helpers/generar-JWT");
const { googleVerify } = require("../helpers/google-verify");


const login = async(req, res = response) => {

  const { correo, password } = req.body;

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


const googleSignIn = async(req, res = response) => {
  
  const { id_token } = req.body

   try {

     const { correo, nombre, img } = await googleVerify( id_token )
    
     let usuario = await Usuario.findOne({ correo });
      
    if( !usuario ){
       //tengo que crearlo
       const data = {
          nombre,
          correo,
          password: ':P',
          img,
          google: true
       };

       usuario = new Usuario(data);
       await usuario.save()
    }
    
    //si el usuario en DB
     if ( !usuario.estado ) {
        res.status(401).json({
          msg:'Hable con el administrador, usuario bloqueado'
        });
     }

     // Generar el JWT
     const token = await generarJWT( usuario.id );


    res.json({
      usuario,
      token
    })

 } catch (error) {
      
      res.status(400).json({
        msg: 'Token de google no es valido'
      })
   }


   res.json({
     msg: 'Todo ok! google sign in ok',
     id_token
   });

}



module.exports = {
  login,
  googleSignIn
}