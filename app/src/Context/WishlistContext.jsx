import { createContext, useContext, useState,useEffect } from 'react';
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';
import axiosInstance from '../../utlities/axiosInstance';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  
  const [wishlistItems, setWishlistItems] = useState([]);
  const {currentUser}=useContext(UserContext)

const fetchwishlist = async () => {
  if (!currentUser) return;
    try {
      const response= await axiosInstance.get(`/user/wishlist`);
      console.log(response.data.products)
      setWishlistItems(response.data?.products || []); 
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  
};

useEffect(()=>{fetchwishlist()},[currentUser])

  const addToWishlist = async(productId) => {
    //  if (!productId) {
    //     toast.error("Invalid product or quantity");
    //     return;
    // }
    
      try {
      await axiosInstance.post("/user/wishlist", { productId },);
      
        await fetchwishlist();
        // toast.success(response.data.message);
      } catch (error) {
        console.error(error.response?.data?.message || "Failed to add to cart");
      }
      
  };

  const removeFromWishlist = async(productId) => {
      try{
        const response=await axiosInstance.delete("/user/wishlist",{data:{productId},})
        await fetchwishlist()
        toast.success(response.data.message);
    }catch(error){
      toast.error("failed to rremove from cart")
      console.error(error)
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
