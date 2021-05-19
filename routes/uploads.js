const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenClaudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');




const router = Router()

 

 router.post( '/',validarArchivoSubir, cargarArchivo );

 router.put('/:coleccion/:id', [
     validarArchivoSubir,
     check('id', 'el id debe de ser de mongo').isMongoId(),
     check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'] ) ),
     validarCampos
 ],actualizarImagenClaudinary  )
 //actualizarImagen

 router.get('/:coleccion/:id', [
    check('id', 'el id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'] ) ),
    validarCampos
 ], mostrarImagen)

 module.exports = router