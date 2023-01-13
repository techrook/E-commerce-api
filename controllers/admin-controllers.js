const Admin = require('../models/admin.model')


//register admin
const createAdmin = async (req,res)=>{
     const emailExist = await Admin.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
          if (emailExist) return res.status(400).json({ message: "Email already exist!" });
     try {
        const  admin =  await Admin.create({...req.body})
        res.status(200).json(admin)
     } catch (error) {
        res.status(500).json(error)
     }
            
}

///login admin
const loginAdmin = async(req,res)=>{
 ///checking if the admin has email and password
 const {email,password} = req.body
   if(!email || !password){
    res.status(403).json('please provide email and password')
   }
    const admin =  await Admin.findOne({ email })
    //checking if there is a admin
    if(!admin){
        res.status(403).json('Invalid User')
    } 
  ///checking if the admin password is correct by using bcrypt.compare
    const ispasswordcorrect = await admin.checkpassword(password)
    if(!ispasswordcorrect){
        res.status(403).json('Invalid Password')
    }
    //sending the admin name and token
    const token = admin.creatjwt()
    res.status(201).json({admin:{name:admin.firstname}, token})
}

//update Admin
const updateAdmin= async(req,res)=>{
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id,{$set:req.body},
            {new:true})
            if(!updatedAdmin){
               return res.status(400).json({msg:'No admin found'})
            }else{
             return res.status(200).json({updateAdmin,msg:'Admin updated sucessfully'})
            }
}

//delete admin
const deleteAdmin = async(req,res)=>{
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id)
            res.status(200).json({msg:'Admin has been deleted  sucessfully....'})
      } catch (error) {
        res.status(500).json(error)
      }
     
}

module.exports ={
    createAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin
}