import Cart from '../models/cartModel.js'
import CustomError from '../utils/CustomError.js'

const getUserCart=async (req,res)=>{
    const data =await Cart.findOne({ userId: user.req.id }).populate('products.productId');
    if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ data: [] });
      }
}
export {getUserCart}