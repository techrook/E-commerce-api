const express = require('express');
const router = express.Router();

const {createUser, loginUser, updateUser, deleteUser,verifyUser} = require('../controllers/user-controllers')
const auth = require('../middleware/authentication')
const userValidatorMiddleware = require('../validator/user.validator');


router.post('/register',userValidatorMiddleware, createUser)
router.post('/login', loginUser)
router.put('/:id',auth, updateUser)
router.delete('/:id', auth, deleteUser)
// router.post("/verifyOTP",verifyOTP)
router.get('/verify/:id', verifyUser)


module.exports = router;