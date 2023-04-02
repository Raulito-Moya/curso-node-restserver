const { Router } = require('express');
const { check } = require('express-validator');
const { postproject } = require('../controllers/project');


const router = Router()

router.post('/postproject',[
    //  check('correo','El correo es obligatorio').isEmail(),
    //  check('password','La contrasena es obligatoria').not().isEmpty(),
    // validarCampos
 ], postproject);

 module.exports = router