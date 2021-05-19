const path = require('path')
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const subirArchivo = ( files , extensionesValidas = ['png', 'jpg', 'jpeg', 'gif' ], carpeta = '' ) => {
  
   return new Promise( (resolve, reject) => {

    const { archivo } = files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado.length - 1 ];
     
    //validar extension 
   
     if ( !extensionesValidas.includes( extension ) ) {
        return reject(`La extension: ${ extension } no es permitida - ${ extensionesValidas }`)
        
     };
  
    
     const nombreTemp = uuidv4() + '.' + extension
     
     const uploadPath = path.join(__dirname , '../uploads', carpeta,  nombreTemp ) ;  //el __dirname llega hasta el contollers
  
    archivo.mv(uploadPath, (err)  => { //se sube el archivo
      if (err) {
          console.log(err);
        reject(err)
      }
  
      resolve({nombreTemp, uploadPath}) //ojo aqui modifico para tner un path para guardar en claudinary 
    });

   });
  
}


module.exports = {
    subirArchivo
}