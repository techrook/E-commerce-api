const mongoose = require('mongoose');

//defining schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    cartegory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    description: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    productimage : {
        data: Buffer,
        contentType: String,
    },
    quantity : {
        type: Number,
        require: true
    },
    created_at : {
        type: Date,
        default: Date.now
    }
});

//creating product model
module.exports = mongoose.model('Products', ProductSchema);