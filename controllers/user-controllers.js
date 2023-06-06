// @ts-nocheck
const User = require('../models/user.model')
const UserVerification = require('../models/UserVerification.model')
const UserOtpVerification = require('../models/UserOtpVerification.model')
const bcrypt = require("bcrypt")
//email handler
const nodemailer = require("nodemailer")
//generate unique id
const {v4: uuidv4}= require("uuid")
//env stuff
require("dotenv").config()
//nodemalier stuff
let transport = nodemailer.createTransport({
  service: 'gmail',
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,
  auth:{
    user:process.env.AUTH_EMAIL,
    pass:process.env.AUTH_PASSWORD
  }
})


//testing success
transport.verify((err,success)=>{
  if(err){
    console.log(err.message);
  }else{
    console.log("ready for messages")
    console.log(success)
  }
})


//register user
const createUser = async(req,res)=>{
  const emailExist = await User.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
    if (emailExist) return res.status(400).json({ message: "Email already exist!" });
       try {
           
          const  user =  new User({...req.body})
          user.save()
          sendOTPVerificationEmail(res)
          res.status(201).json({
            status: "pending",
            message: "Verification otp sent to email",
            data:{
              user,
              emailExist 
            }
          })
        } catch (error) {
          console.log(error);
            res.status(400).json({
              status:"FAILED",
              message:error.message
          })
          }
}

const sendOTPVerificationEmail = async({_id, email}, res)=>{
 
    //generating a 4 digit number
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`
    
    //mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: "caesarlouis0@gmail.com",
      subject: 'Verify Your Email',
      html:  `<p>Enter <b>${otp}</b> in the app to verify your email address</p> <p>This code will exprie in 1 hour</p> `  
    };

    const salt = 10
    const hashedOTP = await bcrypt.hash(otp, salt)
  const newOTPVerification = await  new UserOtpVerification({
      userId:_id,
      otp:hashedOTP,
      createdAt:Date.now(),
      expiresAt:Date.now() + 3600000
    })
    //save otp record
    await  newOTPVerification.save()
    await  transport.sendMail(mailOptions)

    // res.status(201).json({
    //   status: "pending",
    //   message: "Verification otp sent to email",
    //   data:{
    //     userId: _id,
    //     email
    //   }
    // })
  // (error) 
  //   console.log(error);
  //   res.status(400).json({
  //     status:"FAILED",
  //     message:error.message
  // })
  
}

const verifyOTP =async (req,res) =>{
  try {
    let{userId ,otp} = req.body
    if(!userId || !otp){
      throw Error("Empty otp details aer not allowed")
    }else{
      const UserOtpVerificationRecords =await UserOtpVerification.find({
        userId
       })
       //if the user verificaton model is less or = to zero then we found no record
       if(UserOtpVerificationRecords.length <= 0){
        throw new Error(
          "Account record does not exist  or has been verified already. Please sign up or log in"
        )
       }else{
        //if user exist
        const { expiresAt} = UserOtpVerificationRecords[0]
        const hashedOTP = UserOtpVerificationRecords[0].otp

        if(expiresAt < Date.now()){
          //user otp record has expired
           await UserOtpVerification.deleteMany({userId})
           throw new Error("Code has expired. please request again")
        }else{
         const validOTP = bcrypt.compare(otp,hashedOTP)

         if(!validOTP){
          //  if the otp is wrong
          throw new Error("Invalid code. Check your inbox")
         }else{
          //if success
           await User.updateOne({_id:userId},{verified:true})
           await UserOtpVerification.deleteMany({userId})
           res.json({
            status:"VERIFIED",
            message:"User email verified successfully"
           })
         }
        }

      }
    }
  } catch (error) {
    console.log(error)
      res.json({
        status:"FAILED",
        message:error.message
      })
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
    //sending the user name and token
    const token = user.createjwt()
    res.status(201).json({user:{name:user.firstname}, token})
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
    verifyOTP
}