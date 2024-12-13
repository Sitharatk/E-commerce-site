
import ProductModel from "../../models/productModel.js";
import CustomError from "../../utils/CustomError.js";
import {joiProductSchema} from '../../models/validation.js'


const createProduct=async(req,res,next)=>{
    const { error} = joiProductSchema.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }
    console.log(error)
    const { name,arrival,description,category,price,image}=req.body
    if (!req.file || !req.file.path) {
        return next(new CustomError("Product image is required", 400));
      }
      const newProduct = new ProductModel({
        name,arrival,description,category,price,
        image: req.file.path,
      });
     
      if (!newProduct) {
        return next(new CustomError("couldn't create the product"));
      }
      await newProduct.save();
 
      res.status(201).json({ status: "success", message: "Product created successfully" });
}

const updateProduct=async(req,res)=>{
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    return next(new CustomError("Product not found", 404));
  }
  let image = product.image;
  // uploading the image using multer and cloudinary
  if (req.file) {
    image = req.file.path;
  }
  // updating the product
  product.set({ ...req.body, image });
  await product.save();
  res
    .status(200)
    .json({ status: "success", message: "Product updated successfully" });
}

const deleteProduct=async(req,res,next)=>{
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    return next(new CustomError("Product not found", 404));
  }

  product.isDelete=!product.isDelete
  await product.save()
  res.status(200).json({status: "success",message: `Product ${product.isDelete? "deleted" : "restored"} successfully`,
  });
}
export {createProduct,updateProduct,deleteProduct}