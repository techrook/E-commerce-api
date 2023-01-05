const express = require('express')
const router = express.Router()

const {createUser, loginUser, updateUser, deleteUser} = require('../controllers/user-controllers')
const auth = require('../middleware/authentication')


router.post('/register', createUser)
router.post('/login', loginUser)
router.put('/:id', auth,updateUser)
router.delete('/:id', auth,deleteUser)



module.exports = router;