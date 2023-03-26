const { response , request }  = require('express')  //esto lo importo para el tipado
const bcryptjs = require('bcryptjs');  //este paquete para encriptar la contrasena

const User = require('../models/usuario');


const usersGet =  async(req = request, res = response ) => {

   
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true}

   /* const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite) );
 
     const total = await Usuario.countDocuments(query)
    */

     const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
          .skip(Number(desde))
          .limit(Number(limite) )
     ])


     if( isNaN( limite ) || isNaN( desde ) ){
         res.json({
             msg: "limite o desde no definido"
         })
     }else{
           res.json({
                total,
                usuarios
            });
     }

  
}


const usersPut = async(req, res = response ) => {

    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body;

    //todo: validar contra la base de datos
      if ( password ) {
        //encriptar la contraseana
        const salt = bcryptjs.genSaltSync(); //salt es el numero de vueltas
         resto.password = bcryptjs.hashSync( password, salt ); //encripto la constarsena

      }
    
    let user = await User.findByIdAndUpdate( id, resto ) //encontrar en el modelo y actualizar

    res.json(user);

 }



const usersPost = async(req, res = response ) => {
    

    const {username, email, password} = req.body;
    const user = new User({username, email, password}) //le mando el body y el modelo va a guardar en base de datos lo que este validado
     
     
     //Encriptar la contrsena
     const salt = bcryptjs.genSaltSync(); //salt es el numero de vueltas
     user.password = bcryptjs.hashSync( password, salt ); //encripto la constarsena

     //guardar en BD
     await user.save();
    
    res.json({
        msg: 'post API -controlador',
        user
    });

 } 


const usersDelete = async(req, res ) => {

   const { id } = req.params
    
   const uid = req.uid

   //Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id );
   
  const user = await User.findOneAndUpdate( id, { estado: false} ) ; //para borrarlo una mejor practiva es cambiarle el estado al usuario
  

    res.json( user );

 }


 const usersPath = (req, res ) => {
    res.json({
        msg: 'patch API -controlador'
    });

 }


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPath,
}