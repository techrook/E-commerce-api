const express = require('express');
const router = express.Router();
const {initiatePayment,handlePaymentCallback} = require('../controllers/payment.controller');

// Route for initiating a payment
router.post('/initiate/:id', initiatePayment);

// Route for handling the payment callback
router.post('/callback',handlePaymentCallback);

module.exports = router;

