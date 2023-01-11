const Cart = require('../models/cart.model');

const addToCart = async(req, res) => {
    
    await Cart.create({
        product: req.body.product,
        user: req.body.user,
        quantity: req.body.quantity
    })
    .then(cart => {
        res.status(201).json({
            message: "product added to the cart"
        })
        .catch(error => {
            res.status(400).json({
                message: "An error product not added to cart",
                data: error
            })
        })
    })
}
const getCart = async (req, res) => {
    const id = req.params.id

    console.log(id)
    await Cart.findById(id).populate({path: "product", model: "Products", path: "user", model: "Admin"})
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