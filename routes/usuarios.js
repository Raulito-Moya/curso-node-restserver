
const { Router } = require('express');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPath } = require('../controllers/usuarios');

const router = Router()


router.get('/', usuariosGet)

 router.put('/:id', usuariosPut)   //aqui pongo :10 para extraer el primer parms que ponga en el url

 router.post('/', usuariosPost) 

  router.delete('/', usuariosDelete ) 

  router.patch('/', usuariosPath) 



module.exports = router;