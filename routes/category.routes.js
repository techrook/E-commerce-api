const express = require('express');

const categoryController = require('../controllers/category.controller');
const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.addCategories)
router.get('/:id', categoryController.getACategories);

module.exports = router;