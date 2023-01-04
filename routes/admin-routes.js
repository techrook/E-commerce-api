const express = require('express')
const router = express.Router()

const {createAdmin,loginAdmin, updateAdmin, deleteAdmin} = require('../controllers/admin-controllers')



router.post('/register', createAdmin)
router.post('/login', loginAdmin)
router.patch('/:id', updateAdmin)
router.delete('/:id', deleteAdmin)



module.exports = router;