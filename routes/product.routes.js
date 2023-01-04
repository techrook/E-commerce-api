const express = require('express');
const router = express.Router();

router.get('/');
router.get('/:id');
router.post('/addproduct');
router.patch('/updateproduct');
router.delete('/:id');

module.exports = router;

