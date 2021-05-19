const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config');

class Server {
 
    constructor(){  //aqui me creo la const app como una propiedad en la clase del servidor
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
          usuariosPath:  '/api/usuarios',
          authPath:      '/api/auth',
          categorias:    '/api/categorias',
          busqueda:      '/api/buscar',
          productos:     '/api/productos',
          uploads:       '/api/uploads'

        }
      /*  this.usuariosPath = ;
        this.authPath = '/api/auth';
        this.categorias = '/api/categorias';
        this.productos = '/api/productos';
        this.busqueda = '/api/buscar';*/
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

      //FileUploed 
      this.app.use(fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        createParentPath: true
      }));
          
    }


    routes(){

        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.busqueda, require('../routes/buscar'));
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }
 
    
   listen(){

    this.app.listen( this.port, () => {
        console.log('Servidor corriendo en puerto', this.port);
    });

   }

}

module.exports = Server;