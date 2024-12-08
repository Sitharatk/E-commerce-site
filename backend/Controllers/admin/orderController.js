import orderModel from './../../models/orderModel.js';
import CustomError from './../../utils/CustomError.js';

const getTotalOrder=async(req,res)=>{

    const orders = await orderModel.find().populate("products.productId", "name price image")
    .sort({ createdAt: -1 });
  if(!orders){
    return res.status(404).json({message:"No orders found"})
  }
  res.status(200).json({data:orders})
}

const getOrderByUser=async(req,res)=>{
  const orders = await orderModel.find({ userId: req.params.id }).populate("products.productId", "name price image")
  .sort({ createdAt: -1 });
if (!orders) {
  return res.status(200).json({ message: "No orders found" });
}
res.status(200).json({ status: "success",  message: "Orders fetched successfully",  data: orders,  });
}

const getTotalpurchase=async(req,res)=>{
 
}
export {getTotalOrder,getOrderByUser,getTotalpurchase}