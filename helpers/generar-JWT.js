const jwt = require('jsonwebtoken');


const generarJWT = ( uid = '') => {
  
    return new Promise( (resolve, reject) => {

        const payload = {uid}    //en el payload puedo manejar lo que quiera pero en este caso voy a manejar el uid
        
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1h',
        }, ( err, token )=> {
           
            if (err) {
               console.log(err);
               reject('No se pudo generar el Token')
            } else {
                resolve( token );
            }
        })

    })

}


module.exports = {
    generarJWT
}