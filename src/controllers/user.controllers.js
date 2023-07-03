// @ts-nocheck
const User = require('../models/user.model')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
//email handler
const nodemailer = require("nodemailer")

//env stuff
require("dotenv").config()
//nodemalier stuff
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user:process.env.AUTH_EMAIL,
    pass:process.env.AUTH_PASSWORD
  }
})


//testing success
transporter.verify((err,success)=>{
  if(err){
    console.log(err.message);
  }else{
    console.log("ready for messages")
    console.log(success)
  }
})


//register user
const createUser = async(req,res)=>{
  const { email } = req.body
  // Check we have an email
  if (!email) {
     return res.status(422).send({ message: "Missing email." });
  }
  try{
     // Check if the email is in use
     const existingUser = await User.findOne({ email }).exec();
     if (existingUser) {
        return res.status(409).send({ 
              message: "Email is already in use."
        });
      }
     // Step 1 - Create and save the user
     const user = await  User.create({
        _id: new mongoose.Types.ObjectId,
        ...req.body
     });
     // Step 2 - Generate a verification token with the user's ID
     const verificationToken = user.createjwt();
     // Step 3 - Email the user a unique verification link
     const url = `http://localhost:3023/api/v1//user/verify/${verificationToken}`
     console.log(verificationToken);
     transporter.sendMail({
       to:email,
       subject: 'Verify Account',
       html: `Click <a href = '${url}'>here</a> to confirm your email.`
     })
     return res.status(201).send({
       message: `Sent a verification email to ${email}`
     });
 } catch(err){
  console.log(err);
     return res.status(500).send(err);
 }
}


// login user
const loginUser = async(req,res)=>{
    ///checking if the user has email and password
 const {email,password} = req.body
   if(!email || !password){
    res.status(403).json('please provide email and password')
   }
    const user =  await User.findOne({ email })
    //checking if there is a user
    if(!user){
        res.status(403).json('Invalid User')
    } 
  ///checking if the user password is correct by using bcrypt.compare
    const ispasswordcorrect = await user.checkpassword(password)
    if(!ispasswordcorrect){
        res.status(403).json('Invalid Password')
    }
   // Ensure the account has been verified
    if(!user.verified){
      return res.status(403).send({ 
            message: "Verify your Account." 
      });
 }
      
    //sending the user name and token
      const token = user.createjwt()
    res.status(201).json({user:{user:user.firstname}, token})
} 

const verifyUser = async(req,res)=>{
  const {id} =  req.params
  console.log(id)
  // Check we have an id
  if (!id) {
      return res.status(422).send({ 
           message: "Missing token" 
      });
  }
  // Step 1 -  Verify the token from the URL
  let payload = null
  try {
      payload = jwt.verify(
      id,
         process.env.JWT_SECRET
      );
  } catch (err) {
    console.log(err);
      return res.status(500).send(err);
  }
  try{
      // Step 2 - Find user with matching ID
      const user = await User.findOne({ _id: payload.userId })
      console.log(payload.userId);
      if (!user) {
         return res.status(404).send({ 
            message: "User does not  exists" 
         });
      }
      // Step 3 - Update user verification status to true
       await User.findByIdAndUpdate( user,{ verified: true },{new:true});
      return res.status(200).send({
            message: "Account Verified"
      });
   } catch (err) {
    console.log(err);
      return res.status(500).send(err);
   }
}

const forgetpassword = async(req,res)=>{
  try {
    const { email } = req.body;

    // Check we have an email
  if (!email) {
    return res.status(422).send({ message: "Missing email." });
 }
    
 
 const user = await User.findOne({ email });
 
 if (!user) {
   res.status(404).json({ message: 'User not found' });
   return;
  }
  
  // Generate reset token
  const resetToken = user.createjwt();

      const URL = `http://localhost:3023/api/v1//user/reset-password/${resetToken}`
       console.log(URL);
         transporter.sendMail({
           to:email,
           subject: 'Password Reset',
           html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${URL}">Reset Password</a>`
         })
         return res.status(201).send({
          message: `Sent a password reset  email to ${email}`
        });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }

}

const restpassword = async(req,res)=>{
  const { id } = req.params
// console.log(id);
 // Check we have an token
  if (!id) {
      return res.status(422).send({ 
           message: "Missing token" 
      });
    }
    let payload = null
    try {
      payload = jwt.verify(
        id,
          process.env.JWT_SECRET
        );
        res.status(200).send({
          message: "token Verified"
    });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

const resetuserpassword =async(req,res)=>{
try {
  
  const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");


        user.password = req.body.password;
        await user.save();
    
        res.status(200).send({
          message: "password reset sucessfully"
        })
  
} catch (error) {
        res.send("An error occured");
        console.log(error);
}
}















//updating a user
const updateUser =  async (req,res)=>{
      try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},
            {new:true})
            res.status(200).json({msg:'User updated successfully'})
      } catch (error) {
        res.status(500).json(error)
      }
    
}


///deleting user
const deleteUser = async(req,res)=>{
    try {
        const deleteuser = await User.findByIdAndDelete(req.params.id)
            res.status(200).json({msg:'user has been deleted....'})
      } catch (error) {
        res.status(500).json(error)
      }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    verifyUser,
    forgetpassword,
    restpassword,
    resetuserpassword
}