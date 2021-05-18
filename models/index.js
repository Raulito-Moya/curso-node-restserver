//aqui voy a centralizar todo mi modelo en un unico archivo


const Categoria = require("./categoria");
const Role = require("./role");
const Server = require("./server");
const Usuario = require("./usuario");
const Producto = require("./producto")

module.exports = {
    Categoria,
    Producto,
    Role,
    Server,
    Usuario
  


}

