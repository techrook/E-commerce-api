const mongoose = require('mongoose');



const UserVerification = new mongoose.Schema({
    userId:String,
    uniqueString:String,    
    createdAt:Date,
    expriesAt:Date
    
})


module.exports = mongoose.model('UserVerification',UserVerification)