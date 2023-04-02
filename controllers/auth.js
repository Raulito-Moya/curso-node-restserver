const { response } = require("express");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');

const User = require('../models/usuario');

const { generarJWT } = require("../helpers/generar-JWT");
const { googleVerify } = require("../helpers/google-verify");


const login = async(req, res = response) => {

  const { email, password } = req.body;
   console.log(email)
   try {

      //verificar si el email existe
       const user = await User.findOne({ email })
       console.log(user)
      if ( !user ) {
          return res.status(400).json({
            msg: 'Usuario / Password no son correctos -correo'
          })
       } 



      // si el usuario esta activo
    //   if ( !user.estado ) {
    //     return res.status(400).json({
    //       msg: 'Usuario / Password no son correctos -estado: false'
    //     })
    //  } 

      // verificar la contrasena
       const validPassword = bcryptjs.compareSync( password, user.password ); //comparar y hacer match
       console.log(validPassword)
        if ( !validPassword  ) {
         return res.status(400).json({
           msg: 'User / Password are not correct -password'
         })
        }

      let id = user.id
        const token = jwt.sign({ 
          id
         
        }, process.env.SECRETORPRIVATEKEY);
    
      
    res.json({
      msg: 'Login ok',
      user:{
       user
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

     const { email, name, img } = await googleVerify( id_token )
    
     let usuario = await Usuario.findOne({ email });
      
    if( !usuario ){
       //tengo que crearlo
       const data = {
          name,
          email,
          password: ':P',
          img,
          google: true
       };

       user = new Usuario(data);
       await user.save()
    }
    
    //si el usuario en DB
     if ( !user.estado ) {
        res.status(401).json({
          msg:'Hable con el administrador, usuario bloqueado'
        });
     }

     // Generar el JWT
     const token = await generarJWT( user.id );


    res.json({
      user,
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