const { response, request } = require("express");
const { Categoria  } = require("../models");

//obtenercategoria -paginado -total -populate
const obtenerCategoria = async(req = request, res = response) => {
     
     const { limite = 5, desde = 0 } = req.query
     const query = {estado: true}

      const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
             .skip(Number(desde))
             .limit(Number(limite))
             .populate('usuario', 'nombre')
        ])

     if( isNaN(limite) || isNaN(desde) ) {
         res.json({
             msg: "limite o desde no definido"
         })
     } else {
         res.json({
            total,
            categorias 
         })
     }


} 

// obtenerCategoria -populate
const obtenerCategoriaporId = async(req = request, res = response) => {
     
     const { id } =  req.params

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')

     res.json( categoria )
   
}


const crearCategoria = async( req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
       return res.status(400).json({
           msg: `La categoria ${ categoriaDB.nombre }, ya existe`
       })
    }


   //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    
    const categoria = new Categoria( data );

    await categoria.save();

    res.status(201).json(categoria)

}


//actualizarcategoria 

const actualizarCategoria = async( req = request, res = response ) => {
   
  const { id } = req.params
  const { estado, usuario, ...data} = req.body  //estado y usuario el profe lo pone por si lo mandan
  console.log(data);
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });


    res.json(categoria )
 

}


//borrarCategoria -estado false
const borrarCategoria = async(req = request, res = response) => {
    
   const { id } = req.params

   const categoriaBorrada = await Categoria.findOneAndUpdate( id, {estado: false}, {new: true} ) //new: true para que se miren los cambios en la respuesta json
   res.json( categoriaBorrada )
 
    
}


module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategoriaporId,
    actualizarCategoria,
    borrarCategoria
}