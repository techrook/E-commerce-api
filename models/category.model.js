const mongoose = require('mongoose');

//defining schema
const CategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique : true
    }
});

//creating category model
module.exports = mongoose.model('Category', CategorySchema);