const { response , request }  = require('express')  //esto lo importo para el tipado
const bcryptjs = require('bcryptjs');  //este paquete para encriptar la contrasena

const Usuario = require('../models/usuario');


const usuariosGet =  async(req = request, res = response ) => {

   
    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true}

   /* const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite) );
 
     const total = await Usuario.countDocuments(query)
    */

     const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
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


const usuariosPut = async(req, res = response ) => {

    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body;

    //todo: validar contra la base de datos
      if ( password ) {
        //encriptar la contraseana
        const salt = bcryptjs.genSaltSync(); //salt es el numero de vueltas
         resto.password = bcryptjs.hashSync( password, salt ); //encripto la constarsena

      }
    
    const usuario = await Usuario.findByIdAndUpdate( id, resto ) //encontrar en el modelo y actualizar

    res.json(usuario);

 }



const usuariosPost = async(req, res = response ) => {
    

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol}) //le mando el body y el modelo va a guardar en base de datos lo que este validado
     
     
     //Encriptar la contrsena
     const salt = bcryptjs.genSaltSync(); //salt es el numero de vueltas
     usuario.password = bcryptjs.hashSync( password, salt ); //encripto la constarsena

     //guardar en BD
     await usuario.save();
    
    res.json({
        msg: 'post API -controlador',
        usuario
    });

 } 


const usuariosDelete = async(req, res ) => {

   const { id } = req.params
    
   const uid = req.uid

   //Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id );
   
  const usuario = await Usuario.findOneAndUpdate( id, { estado: false} ) ; //para borrarlo una mejor practiva es cambiarle el estado al usuario
  

    res.json( usuario );

 }


 const usuariosPath = (req, res ) => {
    res.json({
        msg: 'patch API -controlador'
    });

 }


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPath,
}