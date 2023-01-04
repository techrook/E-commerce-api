const express = require('express');
const router = express.Router();

router.get('/');
router.put('/additem');
router.patch('/removeitem');
router.delete('/:id');

module.exports = router