const express = require('express');
const router = express.Router();

router.get('/');
router.get('/:id');

module.exports = router;