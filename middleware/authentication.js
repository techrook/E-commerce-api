const user = require('../models/user.model')
const jwt = require('jsonwebtoken')


const auth = async (req,res,next)=>{
 //checking for the header
 const authHeader = req.headers.authorization
 if(!authHeader || !authHeader.startsWith('Bearer ')){
  res.status(401).json('Authentication invaild')
 }
 const token = authHeader.split(' ')[1]

 try {
   const payload = jwt.verify(token,process.env.JWT_SECRET)
   //attchin the user to the routes by adding the jwt
   req.user = {userId:payload.userId, name:payload.name}
   
  next()
 } catch (error) {
   console.log(error);
   res.status(401).json('Authentication invaild')
 }
} 

module.exports = auth
