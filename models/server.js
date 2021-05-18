const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
 
    constructor(){  //aqui me creo la const app como una propiedad en la clase del servidor
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categorias = '/api/categorias';
        this.productos = '/api/productos';
        this.busqueda = '/api/buscar';
         //Conectar a la base de datos
         this.conectarDB();

         //Middelwares : Sona funciones que van a agregarle funcionalidad a mi web server , son funciones que simepre se van a ejecutar cuando se levate el servidor
        this.middlewares();

         //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
          await dbConnection()
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

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.categorias, require('../routes/categorias'));
        this.app.use(this.productos, require('../routes/productos'));
        this.app.use(this.busqueda, require('../routes/buscar'))
    }
 
    
   listen(){

    this.app.listen( this.port, () => {
        console.log('Servidor corriendo en puerto', this.port);
    });

   }

}

module.exports = Server;