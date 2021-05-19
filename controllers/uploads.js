const { response, json } = require("express");
const path = require('path');
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dx33ki9ul', 
  api_key: '147738185934232', 
  api_secret: 'mKHh8F3h5f1DXFVbiteGJnOe_Qs'
}) //configuro cloudinary

const { subirArchivo } = require('../helpers/subir-archivo');
const { Usuario, Producto } = require('../models')



const cargarArchivo = async(req, res = response) => {

// console.log(req.files);

 try {
   
  const nombre = await subirArchivo( req.files, undefined, 'imgs' )
  res.json({
    nombre
  })
 

 } catch (msg) {
   res.status(400).json(msg);
 }

 
}



const actualizarImagen = async(req, res = response) => {

 
    const { id, coleccion } = req.params;

    let modelo;
  
    switch ( coleccion ) {
      case 'usuarios':
         modelo = await Usuario.findById( id ); 
        if ( !modelo ) {
           return res.status(400).json({
             msg: `No existe un usuario con el id ${ id }`
           })
        }

        break;

      case 'productos':
          modelo = await Producto.findById( id ); 
         if ( !modelo ) {
            return res.status(400).json({
              msg: `No existe un producto con el id ${ id }`
            })
         }
    
         break;

    
      default:
        return res.status(500).json({msg: 'se me olvido validar esto'})
      }

 
    // Limpiar imagenes previas 
     if ( modelo.img ) {
      
        //hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads/', coleccion, modelo.img );
        if( fs.existsSync( pathImagen ) ){
           fs.unlinkSync( pathImagen )
        }
     }

  
     const {nombreTemp, uploadPath}= await subirArchivo( req.files, undefined, coleccion )
     modelo.img = nombreTemp
      console.log(nombreTemp);
     await modelo.save()  // se salva en BD
   
     res.json( modelo );

}



const actualizarImagenClaudinary = async(req, res = response) => {
    
  try {
       
      const { id, coleccion } = req.params;
  
      let modelo;
    
      switch ( coleccion ) {
        case 'usuarios':
           modelo = await Usuario.findById( id ); 
          if ( !modelo ) {
             return res.status(400).json({
               msg: `No existe un usuario con el id ${ id }`
             })
          }
      
          break;
      
        case 'productos':
            modelo = await Producto.findById( id ); 
           if ( !modelo ) {
              return res.status(400).json({
                msg: `No existe un producto con el id ${ id }`
              })
           }
      
           break;
    
        default:
          return res.status(500).json({msg: 'se me olvido validar esto'})
        }
   
      // Limpiar imagenes previas 
     if ( modelo.img ) {  //va  a borra la img
         const nombreArr = modelo.img.split('/');
         const nombre    = nombreArr[ nombreArr.length - 1 ];
         const [ public_id ]  = nombre.split('.')  //aqui obtnego el path del url para borrar la img de cloudinary

          cloudinary.uploader.destroy( public_id )
       }


       const { uploadPath}= await subirArchivo( req.files, undefined, coleccion )
       // const { name, size, tempFilePath } = req.files.archivo  el profe envio el tempFilePath pero como ami no me sale yp envie el uploadpath que me nada la promesa subirarchivo
       
        const { secure_url } = await cloudinary.uploader.upload( uploadPath  )
        modelo.img = secure_url;
      
       await modelo.save()  // se salva en BD
    
       res.json( modelo );
     
   } catch (error) {
     res.status(400).json(error)
   }

   

}



const mostrarImagen = async(req, res = response) => {

   
  const { id, coleccion } = req.params;

  let modelo;
  
  switch ( coleccion ) {
    case 'usuarios':
       modelo = await Usuario.findById( id ); 
      if ( !modelo ) {
         return res.status(400).json({
           msg: `No existe un usuario con el id ${ id }`
         })
      }

      break;

    case 'productos':
        modelo = await Producto.findById( id ); 
       if ( !modelo ) {
          return res.status(400).json({
            msg: `No existe un producto con el id ${ id }`
          })
       }
  
       break;

  
    default:
      return res.status(500).json({msg: 'se me olvido validar esto'})
   }


  // Limpiar imagenes previas 
   if ( modelo.img ) {
    
      //hay que borrar la imagen del servidor
      const pathImagen = path.join( __dirname, '../uploads/', coleccion, modelo.img );
      if( fs.existsSync( pathImagen ) ){
         return res.sendFile( pathImagen )
      }
   } else {
    const pathImagen = path.join( __dirname, '../assets/', 'no-image.jpg' );
    if( fs.existsSync( pathImagen ) ){
      return res.sendFile( pathImagen )
    }
   }

 // res.json({msg: 'falta place holder'}) //caundo no va a recibir imagen

}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenClaudinary
}