
import ProductModel from "../../models/productModel.js";
import CustomError from "../../utils/CustomError.js";
import {joiProductSchema} from '../../models/validation.js'

const createProduct = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { error } = joiProductSchema.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }

    if (!req.file || !req.file.path) {
      return next(new CustomError("Product image is required", 400));
    }

    const existingProduct = await ProductModel.findOne({ name: req.body.name });
    if (existingProduct) {
      return next(new CustomError("A product with the same name already exists", 400));
    }

    const newProduct = new ProductModel({
      ...req.body,
      image: req.file.path, // Ensure this is a valid Cloudinary URL
    });
    newProduct.arrival="new";
    await newProduct.save();

    res.status(201).json({ status: "success", message: "Product created successfully" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


const updateProduct=async(req,res)=>{
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    return next(new CustomError("Product not found", 404));
  }
  let image = product.image;

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
const deleteProduct = async (req, res, next) => {
  try {
      const product = await ProductModel.findById(req.params.id);

      if (!product) {
          return next(new CustomError("Product not found", 404));
      }

      product.isDelete = !product.isDelete;
      await product.save();

      res.status(200).json({
          status: "success",
          message: `Product ${product.isDelete ? "deleted" : "restored"} successfully`,
          product,
      });
  } catch (error) {
      return next(new CustomError("An error occurred while updating the product.", 500));
  }
};

export {createProduct,updateProduct,deleteProduct}