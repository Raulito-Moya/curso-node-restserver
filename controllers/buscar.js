const { response } = require("express")
const { ObjectId } = require('mongoose').Types

const { Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
   'usuarios',
   'categorias',
   'productos',
   'roles'
];


const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoId = ObjectId.isValid( termino ); //True si es un id de mongo

    if ( esMongoId ) {
        const usuario = await Usuario.findById( termino )
      return res.json({ 
            results: ( usuario ) ? [ usuario] : []
         })
    }
    

    const regex = new RegExp( termino, 'i' ); //aqui creo una expresion regualr para que sea incesible a las may y min

    const usuarios = await Usuario.find({ 
        $or: [ {nombre: regex/*, estado: true*/}, {correo: regex/*, estado: true*/} ],
        $and: [{ estado: true }] //  pongo aqui para que se mas facil de leer / comento arriba para saber que se puede hace asi tbien
     })
    

    res.json({
        results: ( usuarios ) ? [ usuarios ] : []
    });
    
} 


const buscarCategorias = async( termino = '', res = response) => {

    const esMongoId = ObjectId.isValid( termino ); //True si es un id de mongo

    if ( esMongoId ) {
        const categoria = await Categoria.findById( termino )
      return res.json({ 
            results: ( categoria) ? [ categoria ] : []
         })
    }

    const regex = new RegExp( termino, 'i' );

    const categorias = await Categoria.find({ nombre: regex , estado: true } )
                               .populate('usuario','nombre')

     res.json({
        results: ( categorias ) ? [ categorias ] : []
    }); 
}


const buscarProductos = async( termino = '', res = response) => {

    const esMongoId = ObjectId.isValid( termino ); //True si es un id de mongo

    if ( esMongoId ) {
        const Productos = await Producto.findById( termino ).populate('categoria','nombre')
      return res.json({ 
            results: (Productos) ? [Productos ] : []
         })
    }

    const regex = new RegExp( termino, 'i' );

    const Productos = await Producto.find({ nombre: regex , estado: true } )
                            .populate('categoria','nombre')

     res.json({
        results: ( Productos ) ? [ Productos ] : []
    }); 
}






const buscar = ( req, res = response) => {

    const { coleccion, termino } = req.params

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
     
        res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas } `
        })

       }


    switch ( coleccion ) {
      case 'usuarios':
          buscarUsuarios(termino, res) //aqui mando la res pq me voy a salir
        break;
      case 'categorias':
           buscarCategorias(termino, res)
        break;
      case 'productos':
           buscarProductos(termino,res)

        break;


        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }

  /*  res.json({
        coleccion, termino
    })*/
   
}


module.exports ={
    buscar
}