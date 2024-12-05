import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"

const createToken=(id)=>{
   return jwt.sign({id,},process.env.JWT_SECRET)
}
const loginUser=async (req,res)=>{
      try{
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"user doesn't exists"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if (isMatch){
          const token= createToken(user._id)
          res.json({success:true,token}) 
        }
        else{
            res.json({success:false,message:'invalid credentials'})
        }

      }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
      }

}
const registerUser=async (req,res)=>{
    try{
        const {name,email,password}=req.body
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a valid email"})
        }
        if(password.length<6){
            return res.json({success:false,message:"please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser=new userModel({
             name,
             email,
             password:hashedPassword
        })
        const user=await newUser.save()
        console.log("user registerd")

        res.json({success:true,message:"succes"})
            
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User doesn't exist" });
      }
  
      if (!user.isAdmin) {
        return res.status(403).json({ success: false, message: "Access denied, not an admin" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  
      const token = createToken(user._id);
      res.status(200).json({ success: true, token});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
export {loginUser,registerUser,adminLogin}