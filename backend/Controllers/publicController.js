import Products from '../models/productModel.js'

const allproducts=async(req,res)=>{
    const products=await Products.find()
    if(!products){
        return res.status(404).json({ message: "No item in products" });
    }
    res.json({data:products})
}

const productById=async(req,res)=>{
    const product=await Products.findById(req.params.id)
    if(!product){
        return res.status(404).json({ message: "product not found" });
    }
    res.json({data:product})
}

const productByCatogary=async(req,res)=>{
const {category}=req.params
    const products = await Products.find({ category});
  
    if(!products){
        return res.status(404).json({ message: "No products found in this catogary" });
    }
    res.json({data:products})
}

export {allproducts,productById,productByCatogary} 