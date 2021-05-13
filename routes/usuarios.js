
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPath } = require('../controllers/usuarios');

const router = Router()


 router.get('/', usuariosGet)
 

 router.put('/:id',[
     check('id', 'No es un ID valido').isMongoId(),
     //check('id').custom( existeUsuarioPorId ),   //esta la voya dejar comentada porque no me pasa lo mismo que al profe
     check('rol').custom( esRoleValido ),
     validarCampos
  ] ,usuariosPut);  //aqui pongo :10 para extraer el primer parms que ponga en el url
 

 router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener mas de 6 letras').isLength({ min: 6}),
    check('correo', 'El correo no es valido').isEmail(),  //utilizo validator para validar si es un correo
    check('correo').custom( emailExiste ),
   // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), //aqui le digo que tiene que esistir en esa linea
    check('rol').custom( esRoleValido ), //aqui como custom le manda el rol en un callback , con solo poner la referencia a la funcion , va a recibir el elemento
    validarCampos //aqui ejecuto mi mddlawares spara validar los errores
 ], usuariosPost)

 
 router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ), 
    validarCampos 
   ], usuariosDelete ) 
 

 router.patch('/', usuariosPath) 



module.exports = router;