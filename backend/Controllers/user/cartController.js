import Cart from '../../models/cartModel.js'
import CustomError from '../../utils/CustomError.js'

const getUserCart=async (req,res)=>{
    const data =await Cart.findOne({ userId: req.user.id }).populate('products.productId');
    if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ data: [] });
      }
}

const updateCart=async(req,res,next)=>{
 const { productId, quantity } = req.body;
 if (quantity <1) {
    next(new CustomError("Quantity is not valid " + quantity, 400));
  }
  let cart=await Cart.findOne({userId:req.user.id})
  if(!cart){
    cart= new Cart({
        userId: req.user.id,
        products: [{ productId, quantity }],
      });
    
  }else{
    const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );
      if ( productIndex> -1) {
        cart.products[ productIndex].quantity = quantity;
      } else {
        cart.products.push({ productId, quantity });
    
      }
  }
  await cart.save();
  res.status(200).json({message: "Cart updated successfully"});
};

const removefromCart=async(req,res,next)=>{
    const { productId } = req.body;

  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) {
    return next(new CustomError("Cart not found", 404));
  }

  const productIndex = cart.products.findIndex(
    (item) => item.productId.toString() === productId.toString()
  );

  if (productIndex === -1) {
    return next(new CustomError("Product not found in cart", 404));
  }

  cart.products.splice(productIndex, 1);

  await cart.save();

  res.status(204).json({ message: "Product removed from cart successfully" });
}
export {getUserCart,updateCart,removefromCart}