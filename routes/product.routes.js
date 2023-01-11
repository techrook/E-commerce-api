const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
 const auth = require("../middleware/authentication");
const verifiedAdmin = require('../middleware/authorization')
 

router.get('/',  productController.getAllProducts);
router.get('/:id', productController.getOneProductById);
router.post('/', auth,verifiedAdmin, productController.addProduct);
router.patch('/:id',auth,verifiedAdmin, productController.updateProduct);
router.delete('/:id',auth,verifiedAdmin,  productController.deleteProduct);

module.exports = router;

