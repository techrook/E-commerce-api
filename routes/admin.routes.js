const express = require('express')
const router = express.Router()

const {createAdmin,loginAdmin, updateAdmin, deleteAdmin} = require('../controllers/admin-controllers')
const auth = require('../middleware/authentication')


router.post('/register', createAdmin)
router.post('/login', loginAdmin)
router.put('/:id', auth,updateAdmin)
router.delete('/:id', auth,deleteAdmin)



module.exports = router;