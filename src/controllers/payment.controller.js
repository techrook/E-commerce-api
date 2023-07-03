const Paystack = require('paystack')(process.env.PAYSTACK_secret_key);
const Cart = require("../models/cart.model");
const Products = require("../models/product.model");
const Users = require("../models/user.model");

const initiatePayment = async (req, res) => {
  const cartId = req.params.id;
  const  cart = await Cart.findById(cartId).populate({ path: "product", model: "Products" });
  const product = await Products.findById(cart.product);
  const amount = product.price
  const user = await Users.findById(cart.user);
  const email = user.email
    try {
      console.log(amount)
// Retrieve the necessary data from the request body
  
      // Create a payment request using the Paystack client
      const paymentRequest = await Paystack.transaction.initialize({
        amount, // The amount to be charged
        email, // Customer's email address
        cartId // Unique reference for the transaction
      });
   console.log(paymentRequest)
      // Extract the payment URL from the payment request response
      const paymentUrl = paymentRequest.data.authorization_url;
  
      // Return the payment URL to the client
      res.status(200).json({ paymentUrl });
    } catch (error) {
      console.error('Payment initiation failed:', error);
      res.status(500).json({ error: 'Payment initiation failed' });
    }
  };

  const handlePaymentCallback = async (req, res) => {
    try {
      const { event, data } = req.body; // Retrieve the event and data from the callback payload
  
      // Verify that the event is a successful payment event
      if (event === 'charge.success') {
        const { reference } = data; // Extract the reference from the payment data
  
        // Retrieve the payment details from Paystack using the reference
        const paymentDetails = await paystack.payment.verify(reference);
  
        // Process the payment details and update your application accordingly
        // For example, you can update the order status, send notifications, etc.
  
        res.status(200).end(); // Return a success response to Paystack
      } else {
        res.status(200).end(); // For other events, return a success response without further processing
      }
    } catch (error) {
      console.error('Payment callback handling failed:', error);
      res.status(500).end(); // Return a generic error response in case of any issues
    }
  };

  module.exports = {
    initiatePayment,
    handlePaymentCallback
  };
  
  
