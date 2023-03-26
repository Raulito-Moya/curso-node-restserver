
const { Router } = require('express');
const { check } = require('express-validator');

/*const { validarCampos } = require('../middlewares/validar-campos');
const { validarjwt } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');*/
const {
     validarCampos,
     validarjwt,
     esAdminRole,
     tieneRole
} = require('../middlewares/index')


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const {  usersGet,
   usersPut,
   usersPost,
   usersDelete,
   usersPath, } = require('../controllers/usuarios');



const router = Router()


 router.get('/', usersGet)
 

 router.put('/:id',[
     check('id', 'No es un ID valido').isMongoId(),
     //check('id').custom( existeUsuarioPorId ),   //esta la voya dejar comentada porque no me pasa lo mismo que al profe
     check('rol').custom( esRoleValido ),
     validarCampos
  ] ,usersPut);  //aqui pongo :10 para extraer el primer parms que ponga en el url
 

 router.post('/', [
    check('username', 'the username must be valid').not().isEmpty(),
    check('password','The password  must be valid').isLength({ min: 6}),
    check('email', 'The email must be valid').isEmail(),  //utilizo validator para validar si es un correo
    check('email').custom( emailExiste ),
   // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), //aqui le digo que tiene que esistir en esa linea
  //  check('rol').custom( esRoleValido ), //aqui como custom le manda el rol en un callback , con solo poner la referencia a la funcion , va a recibir el elemento
    validarCampos //aqui ejecuto mi mddlawares spara validar los errores
 ], usersPost)

 
 router.delete('/:id', [
    validarjwt,
   // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'ORTO_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ), 
    validarCampos 
   ], usersDelete ) 
 

 router.patch('/', usersPath) 



module.exports = router;