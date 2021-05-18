const { response, request } = require("express");
const { Router } = require('express');
const { check } = require('express-validator');



const { 
     crearProducto,
     actualizarProducto,
     eliminarProducto,
     obtenerProductos,
     obtenerProductoPorId } = require("../controllers/productos");
const { validarjwt, validarCampos, esAdminRole } = require('../middlewares');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

router.get( '/', obtenerProductos)

router.get( '/:id',[
    check('id', 'No es un id de mongo id').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProductoPorId)

//crear producto
router.post( '/',[
    validarjwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('description','Mande una description del producto por favor'),
    validarCampos
], crearProducto )


router.put( '/:id', [
    validarjwt,
    check('id').custom(existeProductoPorId),
    check('id','No es un id de mongo').isMongoId(),
    validarCampos
],actualizarProducto)


router.delete( '/:id', [
    validarjwt,
    check('id').custom(existeProductoPorId),
    validarCampos
],eliminarProducto)


module.exports = router
