const Cart = require('../models/cart.model');
const Products = require('../models/product.model')

const addToCart = async(req, res) => {

    const userId = req.user.userId
    console.log(req.user.userId);
    const productId = req.params.id
    console.log(req.params.id)
    const quantity = req.query.quantity
    console.log(req.query.quantity);

    try {
      const stock = await  Products.findById(productId)
      console.log(stock.quantity);
      if(stock.quantity > quantity){
        
        const cart = await Cart.create({ product: productId, user: userId, quantity: quantity })
        res.status(200).json({ message:'added successfully!', data : cart})
      }else{
        res.status(400).json('Product is out of stock')  
      }
    }catch (error) {
      return res.status(400).send({ message: "unable to create order", error });
    }

}







const getCart = async (req, res) => {
    const id = req.params.id

    await Cart.findById(id).populate({path: "product", model: "Products"}).populate({ path: "user", model: "Users"})
    .then(cart => {
        res.status(200).json(cart)
    })
    .catch(error => {
        res.status(404).json({
            message: "cart not found",
            data: error
        })
    })
}

module.exports = {
    addToCart,
    getCart
}