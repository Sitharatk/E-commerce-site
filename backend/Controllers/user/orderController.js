import orderModel from '../../models/orderModel.js'
import CustomError from '../../utils/CustomError.js'
import Cart from '../../models/cartModel.js'
import stripe from 'stripe'
import dotenv from 'dotenv';
dotenv.config(); 


const calculateTotalAmount = (cart) => {
  return cart.products.reduce((sum, product) => 
    sum + product.productId.price * product.quantity, 0);
};


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

  const totalAmount = calculateTotalAmount(cart);

    const order = new orderModel({
        userId: req.user.id,
        products: cart.products,
        address,
        totalAmount,
        paymentMethod: "cash on delivery",
        paymentStatus: 'pending',  
        shippingStatus: 'pending',

      });
      console.log(order);
    await order.save();
    
    cart.products = [];
    await cart.save();

    res.status(201).json({success: true, message: "Order created successfully"});
};

const stripePayment=async(req,res,next)=>{
  const { address } = req.body; 
  if (!address) {
    return next(new CustomError('Address is required', 400));
  }

  const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
   if (!cart || cart.products.length === 0) {
        return next(new CustomError('Cart is empty', 400));
      }

  const totalAmount = calculateTotalAmount(cart);
      const line_items = cart.products.map((product) => (
        {
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.productId.name, 
          },
          unit_amount: Math.round(product.productId.price * product.quantity*100), 
        },
        quantity: product.quantity,
      }
    ));
    console.log(line_items);
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel`,
    });
    const newTotal=Math.round(totalAmount*100)

    // Create an order in the database
    const orderData = new orderModel({
      userId: req.user.id,
      products: cart.products,
      address,
      totalAmount:newTotal,
      paymentMethod: 'stripe',
      paymentStatus: 'pending',
      shippingStatus: 'processing',
      sessionId: session.id, 
    });

   await orderData.save();
  
    // Clear the cart
    cart.products = [];
    await cart.save();
  
    // Respond with the session ID and URL
    res.status(201).json({ success: true,message: 'Order created successfully. Proceed to payment.',sessionId: session.id,
      stripeUrl: session.url,
    });
    

}
//gateway initialize
const stripeClient=new stripe(process.env.STRIPE_SECRET_KEY)

const successStripe=async(req,res,next)=>{
  const sessionId = req.params.sessionId;
  const order = await orderModel.findOne({ sessionId: sessionId });
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }

  // Update the order status
  order.shippingStatus = "shipped";
  order.paymentStatus = "Paid";
  await order.save();

  // Respond with success message
  res.status(200).json({success:true,message: "Order placed successfully!"});
}

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


export {orderbycashondelvry,getAllOrders,getoneOrder,cancelOrder,stripePayment,successStripe}

