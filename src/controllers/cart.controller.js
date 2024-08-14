// @ts-nocheck
const Cart = require("../models/cart.model");
const Products = require("../models/product.model");

//add a product to cart
// Assuming you have required necessary models and middleware at the top of your file

// Add a product to the cart   
const addToCart = async (req, res) => {
  const userId = req.user.userId; // Get user ID from the authenticated user
  const productId = req.params.id; // Get product ID from URL params
  const quantity = parseInt(req.query.quantity, 10); // Get quantity from query params and parse to integer

  try {  
    // Find the product to check stock     
    const stock = await Products.findById(productId);
    if (!stock) {
      return res.status(404).json({ message: "Product not found" });
    }
   
    // Check if stock is sufficient
    if (stock.quantity >= quantity) {
      // Check if the product is already in the user's cart
      let cart = await Cart.findOne({ product: productId, user: userId });

      if (cart) {
        // If product is already in the cart, update the quantity
        cart.quantity += quantity;
        await cart.save();
      } else {   
        // Otherwise, create a new cart entry
        cart = await Cart.create({    
          product: productId,
          user: userId,
          quantity: quantity,
        });
      }

      res.status(200).json({ message: "Added to cart successfully!", data: cart });
    } else {
      res.status(400).json({ message: "Product is out of stock" });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: "Unable to add product to cart", error });
  }
};
;

// get a paticular cart
const getCart = async (req, res) => {
  const userId = req.user.userId; // Extract user ID from authenticated user

  try {
    // Find all cart items for the user
    const cartItems = await Cart.find({ user: userId })
      .populate({ path: "product", model: "Products" }) // Populate product details
      .populate({ path: "user", model: "Users" }); // Populate user details (optional)

    if (!cartItems.length) {
      return res.status(404).json({ message: "No cart items found for this user" });
    }

    res.status(200).json(cartItems); // Return array of cart items
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: "Error fetching cart", error });
  }
};



//update cart
const updatecart = (req, res) => {
  const update = req.body;

  Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((cart) => {
      res.status(200).json({
        message: "cart updated",
        data: cart,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: "not updated", data: err });
    });
};

// delete cart
const deletecart = async (req, res) => {
  const productId = req.params.id;
  const quantity = parseInt(req.query.quantity, 10); // Ensure quantity is a number

  try {
    // Fetch the product by its ID
    const stock = await Products.findById(productId);

    // If no product is found, return an error
    if (!stock) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the cart item by its ID
    await Cart.findByIdAndDelete(req.params.id);

    // Update the product stock quantity
    const updatedStockQuantity = stock.quantity + quantity;
    await Products.findOneAndUpdate(
      { _id: stock._id }, // Use stock._id instead of stock.id
      { quantity: updatedStockQuantity },
      { new: true }
    );

    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
   
module.exports = {
  addToCart,
  getCart,
  updatecart, 
  deletecart,
};
