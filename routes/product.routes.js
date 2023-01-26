const express = require('express');
const router = express.Router();

//controller
const productController = require('../controllers/product.controller');

//middleware
const auth = require('../middleware/authentication');
const  {checkAdmin} = require('../middleware/authorization');
const productValidatorMiddleware = require('../validator/product.validator');

 

router.get('/',  productController.getAllProducts);
router.get('/:id', productController.getOneProductById);
router.post('/', auth,checkAdmin, productController.addProduct);
router.patch('/:id',auth,checkAdmin, productController.updateProduct);



module.exports = router;

