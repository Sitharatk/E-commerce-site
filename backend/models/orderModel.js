import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema( {
      userId: { type: mongoose.Schema.Types.ObjectId,required: true,ref: 'User',},
      products: [
        {  productId: { type: mongoose.Schema.Types.ObjectId,required: true,ref: 'Product', },
          quantity: { type: Number,required: true, default: 1, },
        },
      ],
      orderId:{type:String},
      purchasedDate: { type: Date, default: Date.now },
      address: { type: Object, required: true },
      totalAmount: { type: Number},
      paymentMethod:{type:String,enum: ['cash on delivery', 'stripe'],
        default: 'cash on delivery'},
        paymentStatus:{type:String, enum: ['pending', 'paid', 'Cancelled'],default:"pending"},
        shippingStatus:{type:String, enum: ['processing', 'delivered', 'Cancelled','shipped'],dafault:"processing"},
      sessionId: {  // For Stripe session tracking
        type: String,
      },
      
    },
    { timestamps: true }
  );
  const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
  export default orderModel;