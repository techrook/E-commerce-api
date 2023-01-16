const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller')
const auth = require("../middleware/authentication");

router.get('/:id',auth, cartController.getCart);
router.post('/:id',auth, cartController.addToCart);
router.patch('/');
router.delete('/:id');

module.exports = router

