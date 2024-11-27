import mongoose from 'mongoose';
 const wishListSchema =new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, required: true,ref: 'User', 
      },
      products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
          },

      ]},
      { timestamps: true }
    )

 const wishListModel=mongoose.models.Order || mongoose.model('WishList',wishListSchema)
 export default wishListModel