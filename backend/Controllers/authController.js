import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"

const createToken=(id,isAdmin)=>{
   return jwt.sign({id,isAdmin},process.env.JWT_SECRET, { expiresIn: '45m' })
}
const createRefreshToken = (id,isAdmin) => {
  return jwt.sign({ id,isAdmin }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' });
};


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
          const refreshToken = createRefreshToken(user._id);
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, 
          });
  
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
  
      const token = createToken(user._id, user.isAdmin);
      const refreshToken = createRefreshToken(user._id,user.isAdmin)
      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("refreshToken", refreshToken, { httpOnly: true,
  secure: false,
  sameSite: "none",
});
res.json({ success: true, message: "Logged in successfully", token });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const refreshToken=async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      next(new CustomError("No refresh token found", 401));
    }
    // Verifying the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      next(new CustomError("User not found", 401));
    }
    const token = createToken(user._id, user.isAdmin);
    res.status(200).json({ message: "Token refreshed", token: token });
  }

const logout=async(req,res)=>{
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure:false,
    sameSite: "none",
  });
  
  res.clearCookie('token', {
    httpOnly: true,
    secure:false,
    sameSite: "none",
  });

  res.status(200).json({ success: true, message: "Logged out successfully",
  });
}
export {loginUser,registerUser,adminLogin,refreshToken,logout}