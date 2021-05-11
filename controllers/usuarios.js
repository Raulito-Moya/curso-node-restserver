const { response , request }  = require('express')  //esto lo importo para el tipado
 

const usuariosGet =  (req = request, res = response ) => {

    const {q, nombre = "No name", apikey, page = "1", limit = "10"}= req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
     });
}


const usuariosPut = (req, res = response ) => {

    const { id } = req.params
    
    res.json({
        msg: 'put API -controlador',
        id
    });

 }


const usuariosPost = (req, res ) => {
    
    const {nombre, edad} = req.body
     
    res.json({
        msg: 'post API -controlador',
        nombre, 
        edad
    });
 } 


const usuariosDelete = (req, res ) => {
    res.json({
        msg: 'delete API -controlador'
    });

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