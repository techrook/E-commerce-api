const express = require('express')
const router = express.Router()

const {createUser, loginUser, updateUser, deleteUser} = require('../controllers/user-controllers')



router.post('/register', createUser)
router.post('/login', loginUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)



module.exports = router;