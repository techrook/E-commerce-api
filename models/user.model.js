const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fristname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    password:{
     type:String,
     required:true,
     minlength:6
    },
    email:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
})

module.exports = mongoose.model('Users',UserSchema)