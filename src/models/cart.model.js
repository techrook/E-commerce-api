const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
