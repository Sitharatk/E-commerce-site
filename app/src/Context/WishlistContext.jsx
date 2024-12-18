import { createContext, useContext, useState,useEffect } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import Cookies  from 'js-cookie';
import { toast } from 'react-toastify';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  
  const [wishlistItems, setWishlistItems] = useState([]);
  const {currentUser}=useContext(UserContext)

const fetchwishlist = async () => {
  if (!currentUser) return;
  const token = Cookies.get("token");
  if (!token) return;
    try {
      const {data}= await axios.get(`http://localhost:3000/user/wishlist`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data.products)
      setWishlistItems(data?.products || []); 
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  
};

useEffect(()=>{fetchwishlist()},[currentUser])

  const addToWishlist = async(productId) => {
     if (!productId) {
        toast.error("Invalid product or quantity");
        return;
    }
    
      const token = Cookies.get("token");
      if (!token) {
        toast.error("user not authenticated ,log in")
        return;
      }
      try {
        const response = await axios.post("http://localhost:3000/user/wishlist", { productId }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      
        await fetchwishlist();
        toast.success(response.data.message);
      } catch (error) {
        console.error(error.response?.data?.message || "Failed to add to cart");
      }
      
  };

  const removeFromWishlist = async(productId) => {
    const token = Cookies.get("token");
      if (!token) {
        toast.error("user not authenticated ,log in")
        return;
      }
      try{
        const response=await axios.delete("http://localhost:3000/user/wishlist",{data:{productId},
        headers: { Authorization: `Bearer ${token}` }})
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
