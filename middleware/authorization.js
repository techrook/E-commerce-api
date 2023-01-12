const admin = require('../models/admin.model')

const checkAdmin = async (req, res, next) => {
  await admin.findOne(req.user.userId)

  if(!req.user.userId){
   return res.status(401).json({ error: 'Unauthorized' })
}console.log(req.user);
    next()
};

module.exports = checkAdmin