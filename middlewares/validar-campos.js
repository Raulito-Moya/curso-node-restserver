const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);  //aqui se almacenan los resultados de la validaciones
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next()  //next como es un middlewares es lo que tengo que llamar si el midlawawe pasa
   
}

module.exports = {
    validarCampos
}