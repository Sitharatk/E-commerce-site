import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  // id: { type: String,required: true},
  name: { type: String, required: true},
  category: {type: String,required:true},
  image: { type: String},
  price: {type: Number,required: true},
  old_price: {type: Number},
  description: { type: String,required: true },
  arrival: {type: String, enum: ['new', 'old'], required: true},
  isDelete:{type:Boolean,default:false}
});

const ProductModel = mongoose.models.product || mongoose.model('Product', productSchema);

export default ProductModel;
