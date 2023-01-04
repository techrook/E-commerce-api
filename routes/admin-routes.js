const express = require('express')
const router = express.Router()

const {createAdmin,loginAdmin, updateAdmin, deleteAdmin} = require('../controllers/admin-controllers')



router.post('/admin/register', createAdmin)
router.post('/admin/login', loginAdmin)
router.patch('/:id', updateAdmin)
router.delete('/:id', deleteAdmin)



module.exports = router;