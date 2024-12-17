import userModel from "../../models/userModel.js";
import CustomError from "../../utils/CustomError.js";
import mongoose from "mongoose";

const getAllusers=async(req,res,next)=>{
   const users=await userModel.find({},{password:0})
    if (!users || users.length === 0) {
        return next(new CustomError("No users found", 404));
      }
      res.status(200).json({ success: true, data: users });
}

const getUserById=async(req,res,next)=>{
  const {id}=req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new CustomError("Invalid ID format", 400));
  }
  const user=await userModel.findById(id,{password:0})
  if (!user) {
    return next(new CustomError("No users found", 404));
  }
  res.status(200).json({ success: true, data: user });
}

const blockUser=async(req,res,next)=>{
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new CustomError("Invalid order ID format", 400));
  }
   const user=await userModel.findById(req.params.id)
   if (!user) {
    return next(new CustomError("No users found", 404));
  }
  user.isBlock=!user.isBlock
  await user.save()
  res.status(200).json({status: "success",message: user.isBlock ? "User blocked" : "User unblocked"});
}

export {getAllusers,getUserById,blockUser}