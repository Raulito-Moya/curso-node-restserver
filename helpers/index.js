

const dbValidators = require('./db-validators');
const generarJWT = require('./generarJWT');
const googleVerify = require('./google-verify');
const dbValidators = require('./subir-archivo');


module.exports = {
    
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...dbValidators,

}