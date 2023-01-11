const express = require('express');

const auth = require("../middleware/authentication");
const cartController = require('../controllers/cart.controller')
const router = express.Router();

router.get('/:id',auth, cartController.getCart);
router.post('/',auth, cartController.addToCart);
router.patch('/');
router.delete('/:id');

module.exports = router