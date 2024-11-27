import mongoose from 'mongoose';
 const orderSchema =new mongoose.Schema({

 })

 const orderModel=mongoose.models.Order || mongoose.model('Order',orderSchema)
 export default orderModel