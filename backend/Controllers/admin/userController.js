import userModel from "../../models/userModel.js";
import CustomError from "../../utils/CustomError.js";

const getAllusers=async(req,res,next)=>{
   const users=await userModel.find({},{password:0})
    if (!users || users.length === 0) {
        return next(new CustomError("No users found", 404));
      }
      res.status(200).json({ success: true, data: users });
}

export {getAllusers}