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
      const stock =  Products.findById(productId)
      if(stock.quantity < quantity){
        const cart = await Cart.create({ product: productId, user: userId, quantity: quantity })
        res.status(200).json(cart,{ message:'added successfully!'})
      }else{
        res.status(400).json('Product is out of stock')  
      }
    }catch (error) {
      return res.status(400).send({ message: "unable to create order", error });
    }
       
            
    
    
    

}



// const addToCart = async(req, res) => {
//     // Extract product information from request body
//     const { product_Id, quantity } = req.body;
//     console.log(product_Id);

//     // Retrieve product from the database
//     try {
//         const product = await Products.findOne({ _id: product_Id });
//         if (quantity > product.stock) {
//             res.status(400).json(' Not enough stock for this product.')
//         } else {
//           // Add item to cart
//           const cart = Cart.create()
//           return res.status(201).json(cart,{message:'added successfuly'})
//         }
//       } catch(err) {
//         // handle error
//        res.status(400).json(err,{ message: "unable to create order"});
//       }
// }





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