const Cart = require('../models/cart.model');
const Products = require('../models/product.model')

const addToCart = async(req, res) => {
    const userId = req.body.user
    const productId = req.body.product
    var quantity = parseInt(req.body.quantity)

    

    try {
         const stock =  await Products.findById(productId)
         console.log(stock.quantity)
         console.log(quantity)
        if(stock.quantity < quantity){
            await Cart.create({
                product:productId ,
                user: userId,
                quantity: quantity
            })
            .then(cart => {
                return res.status(201).json({
                    message: "product added to the cart"
                })
               
            })
            .catch(error => {
                return res.status(400).json({
                    message: "An error product not added to cart",
                    data: error
                })
            })
        }

    }
    catch (error) {
        return res.status(500).json({
            message: "an error occured",
            data: error
        })
    }
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