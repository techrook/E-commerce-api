const admin = require('../models/admin.model')
const Cart = require('../models/cart.model')


const checkAdmin = (req, res, next) => {
    if(req.user.isAdmin){
      next()
    }else{
      return res.status(401).json({ error: 'Unauthorized' })
    }
  };


const checkUser = async (req, res, next)=> {
    const cartId = req.params.id;
    const userId = req.user.userId;
  
    // Retrieve the cart item from the database
    const cartItem = Cart.findById(cartId);
  
    // Compare the userId of the cart item with the userId from the request
    if (cartItem.user === userId) {
      // Allow the request to proceed
      next();
    } else {
      // Return an error message
      res.status(401).json({error: "Unauthorized to update this cart"});
    }
  };


module.exports = {
  checkAdmin,
  checkUser
}