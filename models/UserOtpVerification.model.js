const mongoose = require('mongoose');



const UserOtpVerification = new mongoose.Schema({
    userId:String,
    otp:String,
    createdAt:Date,
    expriesAt:Date
    
})


module.exports = mongoose.model('UserOtpVerification',UserOtpVerification)