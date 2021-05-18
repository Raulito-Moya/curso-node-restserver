const { Router } = require('express');
const { check } = require('express-validator');
const { 
     crearCategoria,
      obtenerCategoria,
      obtenerCategoriaporId,
      actualizarCategoria,
      borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const { validarjwt, validarCampos, esAdminRole } = require('../middlewares');


const router = Router()

/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - publico
router.get('/', obtenerCategoria);


//Obtener una categoria por id - publico
router.get('/:id', [
     check('id', 'No es un id de mongo id').isMongoId(),
     check('id').custom(existeCategoriaPorId), //aqui hago un throw error y me salgo
     validarCampos
],obtenerCategoriaporId);


//Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
     validarjwt,
     validarCampos
    ],
    crearCategoria
);


//Actualizar - privado - cualquiera con token valido
router.put('/:id',[
    validarjwt,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria );


//Borrar una categoria -Admin
router.delete('/:id',[
    validarjwt,
    esAdminRole,
    check('id').custom( existeCategoriaPorId ),
    validarCampos
   ], borrarCategoria);

 module.exports = router