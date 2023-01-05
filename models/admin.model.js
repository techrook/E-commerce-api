const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const AdminSchema = new mongoose.Schema({
    firstname:{
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
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:true
    },
})

//encrypting password 
AdminSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
   })
   
   //created a jwt for the admin
   AdminSchema.methods.createjwt = function(){
       return jwt.sign({adminId:this._id, admin:this.admin},process.env.JWT_SECRET,
           {expiresIn:process.env.JWT_LIFESPAN})
   }
   
   ///checking if the admin password is correct for the login using bcrypt.compare
   AdminSchema.methods.checkpassword = async function(adminpassword){
       const passwordmatch = await bcrypt.compare(adminpassword, this.password)
       return passwordmatch
   }
   // validation


module.exports = mongoose.model('Admin',AdminSchema)