const admin = require('../models/admin.model')

const checkAdmin = (req, res, next) => {
  admin.findOne(req.user.userId)
  if(!req.user.userId){
    console.log(req.user.userId);

   return res.status(401).json({ error: 'Unauthorized' })
}
    next()
};

module.exports = checkAdmin