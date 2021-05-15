
const  validaCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');

module.exports = {  // aqui en index.js exporto las exportaciones pra simplificar las exportaciones de node en usuarios
    ...validaCampos,
    ...validarJWT,
    ...validarRoles
}