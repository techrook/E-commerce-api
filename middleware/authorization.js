require('../models/admin.model')

const checkAdmin = (req, res, next) => {
  if(!req.user.isAdmin){
    console.log(req.user.isAdmin);
   return res.status(401).json({ error: 'Unauthorized' })
}
    next()
};

module.exports = checkAdmin