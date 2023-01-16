const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

const auth = require('../middleware/authentication')
 const  checkAdmin = require('../middleware/authorization')
 

router.get('/',  productController.getAllProducts);
router.get('/:id', productController.getOneProductById);
router.post('/', auth,checkAdmin, productController.addProduct);
router.patch('/:id',auth,checkAdmin, productController.updateProduct);



module.exports = router;

