const { response, request } = require("express");
const { Producto, Categoria } = require('../models')


//obtener productos
const obtenerProductos = async( req = request, res = response ) => {
     
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate('categoria', 'nombre')
        
    ])

  
   res.json({
       total,
       productos

   })


}


//obtner producto por id
const obtenerProductoPorId = async( req = request, res = response ) => {
   
    const { id } = req.params

    const producto = await Producto.findById( id )
                                   .populate('categoria', 'nombre')
                                   .populate('usuario', 'nombre')

    if ( !producto ) {
      res.status(400).json({
          msg: `No existe ese producto ${id}`
      })
    }

    res.json({
        producto
    })
  
}


//crear producto

const crearProducto = async(req = request, res = response) => {
  
    try {
        
        const {estado, usuario, ...body} = req.body
     
        const productoDB = await Producto.findOne({ nombre:body.nombre })
    
        if( productoDB ) {
            res.json({
                msg: `El producto ${ nombre } ya existe`
            })
        }
    

       const data = {
           ...body,
           nombre: body.nombre.toUpperCase(),
           usuario: req.usuario._id,
           
       }
    
     
       const producto = new Producto( data );
    
       await producto.save();
    
       res.status(201).json( producto )
    

    } catch (error) {
        
   res.status(400).json({
       msg:`a ocurrido un error ${error}`
   })

    }
 
}


//actualizar producto
const actualizarProducto = async(req = request, res = response) => {
  
    const { id } = req.params
    const { estado, ...data } = req.body

   if ( data.nombre ) {
        data.nombre = data.nombre.toUpperCase();
   }
   
    data.usuario = req.usuario._id

    console.log(data);
    const producto = await Producto.findByIdAndUpdate(id,data , { new: true })

    res.json( producto )

}


//eliminar producto
const eliminarProducto = async(req = request, res = response) => {
    
    const { id } = req.params
    
    const producto = await Producto.findByIdAndUpdate(id, { estado:false }, { new: true })
    
    res.json( producto )
}


module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}