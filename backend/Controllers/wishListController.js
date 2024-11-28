import wishList from "../models/whishListModel.js";
import CustomError from "../utils/CustomError.js";


const getwishList=async(req,res,next)=>{
   const data=await wishList.findOne({ userId: req.user.id }).populate('products.productId');
   if (data) {
    res.status(200).json(data);
  } else {
    res.status(200).json({ product: [] });
  }
}

const addTowishList = async (req, res, next) => {
  const { productId } = req.body;
  if (!productId) {
    return next(new CustomError("Product id is required", 400));
  }

  let newWishList = await wishList.findOneAndUpdate(
    { userId: req.user.id },
    { $addToSet: { products: productId } },
    { new: true }
  );

  if (!newWishList) {
    newWishList =new wishList({
      userId: req.user.id,
      products: [productId],
    });
    await newWishList.save();
  }
  res.status(200).json({message: "Product added to wishlist successfully"});
};

const removefromwishList= async (req,res,next)=>{
  const { productId } = req.body;

  let newWishList = await wishList.findOneAndUpdate(
    { userId: req.user.id },
    { $pull: { products: productId } },
    { new: true }
  );
  if (newWishList) {
    res.status(201).json({message: "Product removed from wishlist successfully"});
  } else {
    next(new CustomError("product not found in wishlist", 404));
  }


}

export  {getwishList,addTowishList,removefromwishList}
