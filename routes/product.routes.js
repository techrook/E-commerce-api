const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
// const auth = require("../middleware/authentication");

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getOneProductById);
router.post('/', productController.addProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;

