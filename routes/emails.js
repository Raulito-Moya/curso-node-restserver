const { Router } = require('express');
const { check } = require('express-validator');
const { callbackprojectfunction } = require('../controllers/email');


const router = Router()

router.post('/projectemail',[
    //  check('correo','El correo es obligatorio').isEmail(),
    //  check('password','La contrasena es obligatoria').not().isEmpty(),
    // validarCampos
 ], callbackprojectfunction);

 module.exports = router