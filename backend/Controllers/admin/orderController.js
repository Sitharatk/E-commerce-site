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

const getTotalorders=async(req,res,next)=>{
  const totalPurchase = await orderModel.aggregate([
    { $match: { shippingStatus: { $ne: "cancelled" } } },
    { $unwind: "$products" }, 
    { $group: { _id: null, totalProducts: { $sum: "$products.quantity" } } } 
  ]);
  if (!totalPurchase || totalPurchase.length === 0) {
    return next(new CustomError("No products purchased found", 404));
  }
  const total = totalPurchase[0].totalProducts;
  res.status(200).json({ success: true, totalorderedProducts: total });

}

const getTotalRevenue=async(req,res,next)=>{
  const totalRevenue = await orderModel.aggregate([
    { $match: { paymentStatus: "paid" } }, 
    { $group: {_id: null, totalRevenue: { $sum: "$totalAmount" },}, },]);

  const revenue = totalRevenue[0]?.totalRevenue || 0; 

  res.status(200).json({success: true,totalRevenue: revenue });
}

const updateShipingStatus=async(req,res,next)=>{
  const order = await orderModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { shippingStatus: req.body.status } },
    { new: true }
  );
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }
  if(order.shippingStatus === "Cancelled") return next(new CustomError("You can't update this order", 400));
  if(order.shippingStatus === "Delivered") return next(new CustomError("You can't update this order", 400));
  res
    .status(200)
    .json({ status: "success", message: "Order status updated successfully",data:order });
};

const updatePaymentStatus = async (req, res, next) => {
  const { id } = req.params;

  const order = await orderModel.findOneAndUpdate(
    {  _id: id, 
      paymentStatus: { $ne: "paid" }, 
      paymentStatus: { $ne: "cancelled" } 
    },
    { $set: { paymentStatus: "paid" } }, 
    { new: true }
  );
  
  if (!order) {
    return next(new CustomError("Order not found or payment status is already updated to paid or cancelled", 400));
  }
 
  res.status(200).json({status: "success",message: "Order payment status updated to paid successfully", data: order,
  });
};


export {getTotalOrder,getOrderByUser,getTotalorders,getTotalRevenue,updateShipingStatus,updatePaymentStatus}