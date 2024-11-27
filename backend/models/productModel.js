import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String,required: true},
  name: { type: String, required: true},
  category: {type: String},
  image: { type: String, required: true},
  price: {type: Number,required: true},
  old_price: {type: Number,required: true },
  description: { type: String,required: true },
  arrival: {type: String, enum: ['new', 'old'], required: true}
});

const ProductModel = mongoose.models.product || mongoose.model('Product', productSchema);

export default ProductModel;
