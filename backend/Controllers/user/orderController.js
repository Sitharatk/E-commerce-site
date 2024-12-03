import orderModel from '../../models/orderModel.js'
import CustomError from '../../utils/CustomError.js'
import Cart from '../../models/cartModel.js'

const orderbycashondelvry=async(req,res,next)=>{
    const { address } = req.body; 
   
    if (!address) {
        return next(new CustomError('Address is required', 400));
      }
      const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
     
      if (!cart || cart.products.length === 0) {
        return next(new CustomError('Cart is empty', 400));
      }


      const invalidProducts = cart.products.filter((p) => !p.productId);
    if (invalidProducts.length > 0) {
        return next(new CustomError("Cart contains invalid products", 400));
    }
    const order = new orderModel({
        userId: req.user.id,
        products: cart.products,
        address,
        paymentStatus: 'pending',  
        shippingStatus: 'pending',
      });
      console.log(order);
    await order.save();
    
    cart.products = [];
    await cart.save();

    res.status(201).json({success: true, message: "Order created successfully"});
};


const getAllOrders = async (req, res) => {
  const Orders = await orderModel.find({ userId: req.user.id })
    .populate("products.productId") .sort({ createdAt: -1 });
  if (Orders) {
    res.status(200).json({ data: Orders });
  } else {
    res.status(200).json({ data: [] });
  } 
};

const getoneOrder=async(req,res,next)=>{
 const Order=await orderModel.findOne({ userId: req.user.id ,_id:req.params.orderId})
 .populate("products.productId") 
 if (Order) {
  res.status(200).json({ data: Order });
} else {
  res.status(200).json({ data: [] });
}
}

const cancelOrder =async(req,res,next)=>{
  const Orders = await orderModel.findByIdAndUpdate({_id:req.params.orderId, userId: req.user.id },
   { $set: { shippingStatus: "Cancelled" } },
    { new: true }
  )
  if(!Orders){
    return next(new CustomError("Order not found", 404));
  }
  res.status(200).json({ message: "Order cancelled" });
}


export {orderbycashondelvry,getAllOrders,getoneOrder,cancelOrder}

