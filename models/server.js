const express = require('express');
const cors = require('cors');

class Server {
 
    constructor(){  //aqui me creo la const app como una propiedad en la clase del servidor
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

         //Middelwares : Sona funciones que van a agregarle funcionalidad a mi web server , son funciones que simepre se van a ejecutar cuando se levate el servidor
        this.middlewares();

         //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){
    
      //CORDS
      this.app.use( cors() )  // aqui se configura el cords

      //Lectura y parseo del body
      this.app.use( express.json() );

      //Directorio publico
      this.app.use( express.static('public') )
          
    }


    routes(){
       
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }
 
    
   listen(){

    this.app.listen( this.port, () => {
        console.log('Servidor corriendo en puerto', this.port);
    });

   }

}

module.exports = Server;