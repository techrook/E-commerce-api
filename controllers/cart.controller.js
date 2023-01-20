const Cart = require('../models/cart.model');
const Products = require('../models/product.model')


//add a product to cart
const addToCart = async(req, res) => {

    const userId = req.user.userId
    //console.log(req.user.userId);
    const productId = req.params.id
    //console.log(req.params.id)
    const quantity = req.query.quantity
    //console.log(req.query.quantity);

    
    
    try {      
      const stock = await  Products.findById(productId)
      console.log(stock.quantity);
      
      if(stock.quantity > quantity){
        
        const cart = await Cart.create({ product: productId, user: userId, quantity: quantity })
        
        const updatedStockQuantity = stock.quantity - quantity;
        await Products.findOneAndUpdate({ _id: stock.id }, { quantity: updatedStockQuantity },{ new: true });
        
        res.status(200).json({ message:'added successfully!', data : cart})
      }else{
        res.status(400).json({ message:'Product is out of stock'})  
      }
    }catch (error) {
      return res.status(400).send({ message: "unable to create order", error });
    }

}






// get a paticular cart
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

//update cart
 const updatecart = async(req,res)=>{

  const update = req.body 

  await Cart.findByIdAndUpdate( req.params.id, {$set:req.body,},{ new:true } )
    .then( cart=> {
      res.status(200).json(
        {
          message:'cart updated',
          data : cart  });
    })
    .catch(err => {
      res.status(400).json(
        { message : "not updated", 
      data : err});
    })

 }


// delete cart
const deletecart = async(req,res)=>{
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
    addToCart,
    getCart,
    updatecart,
    deletecart
}