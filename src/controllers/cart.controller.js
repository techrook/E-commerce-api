const mongoose = require("mongoose");
const Cart = require("../models/cart.model");
const Products = require("../models/product.model");

// Add a product to the cart
const addToCart = async (req, res) => {
  const userId = req.user.userId; // Get user ID from the authenticated user
  const productId = req.params.id; // Get product ID from URL params
  const quantity = parseInt(req.query.quantity, 10); // Get quantity from query params and parse to integer

  try {
    // Find the product to check stock
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if stock is sufficient
    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    // Check if the product is already in the user's cart
    let cartItem = await Cart.findOne({ user: userId, product: productId });

    if (cartItem) {
      // If the product is already in the cart, update the quantity
      cartItem.quantity += quantity;
    } else {
      // Otherwise, create a new cart entry
      cartItem = await Cart.create({
        product: productId,
        user: userId,
        quantity: quantity,
      });
    }

    // Update the product stock
    product.quantity -= quantity;
    await product.save();

    // Save the updated cart item
    await cartItem.save();

    res.status(200).json({ message: "Added to cart successfully!", data: cartItem });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: "Unable to add product to cart", error });
  }
};
    
// Get a particular cart
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

// Update cart
const updatecart = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart updated", data: cartItem });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Error updating cart", error });
  }
};

// Delete cart
const deletecart = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.userId; // Assuming you extract user ID from the token
  const quantityToRemove = parseInt(req.query.quantity, 10); // Quantity to remove

  try {
    // Find the cart item that matches the product ID and user ID
    const cartItem = await Cart.findOne({ user: userId, product: productId });

    // If no cart item is found, return an error
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Check if the quantity to remove is less than the current quantity in the cart
    if (cartItem.quantity > quantityToRemove) {
      // Reduce the quantity in the cart item
      cartItem.quantity -= quantityToRemove;
      await cartItem.save(); // Save the updated cart item
    } else {
      // If the quantity to remove is equal to or exceeds the current quantity, remove the cart item
      await Cart.findByIdAndDelete(cartItem._id);
    }

    // Update the product stock
    const product = await Products.findById(productId);
    if (product) {
      const newStockQuantity = product.quantity + quantityToRemove;

      // Check if the new stock quantity exceeds the maximum allowed value
      

      product.quantity = newStockQuantity;
      await product.save(); // Save the updated product stock
    }

    return res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
  addToCart,
  getCart,
  updatecart,
  deletecart,
};
