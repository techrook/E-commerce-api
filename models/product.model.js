const mongoose = require('mongoose');

//defining schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImage:{
        productImg:String,
    productid:String,
    },
    quantity : {
        type: Number,
        required: true,
        max: 25
    },
},
    { timestamps: true }
);

//creating product model
module.exports = mongoose.model('Products', ProductSchema);