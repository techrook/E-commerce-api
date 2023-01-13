const admin = require('../models/admin.model')

const checkAdmin = (req, res, next) => {
  // admin.findOne(req.user.userId)
  if(req.user.isAdmin){
    console.log(req.user);
    next()
  }else{
   return res.status(401).json({ error: 'Unauthorized' })
  }

};





module.exports = checkAdmin