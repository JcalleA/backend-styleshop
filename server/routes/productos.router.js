const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');


//post
router.post('/registrar', productosController.registrarProducto);



// router.post('/login', negocioController.login);

// //get
// // router.get('/getUsers', usuarioController.find);
router.get('/getproductos', productosController.getProductos);
router.get('/getcategoria/:categoria', productosController.getCategoria);
// //put
// router.put('/update', negocioController.update);

// //delete
// router.delete('/deleteUser/:id', negocioController.remove);
router.delete('/remove/:id', productosController.removerProducto);

module.exports = router;
