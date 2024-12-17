import { createContext, useState ,useEffect, useContext} from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


// eslint-disable-next-line react-refresh/only-export-components
export const cartContext = createContext();

// eslint-disable-next-line react/prop-types
function CartProvider({children}) {


const [userCart,setUserCart]=useState([])   
const {currentUser,setCurrentUser}=useContext(UserContext)


const fetchUserCart = async () => {
  if (!currentUser) return;
  const token = Cookies.get("token");
  if (!token) return;
    try {
      const { data } = await axios.get(`http://localhost:3000/user/cart`,{
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserCart(data.cart || []); 
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  
};
useEffect(()=>{fetchUserCart()},[currentUser])

const addToCart=async(productId,quantity)=>{
  const token = Cookies.get("token");
  if (!token) {
    toast.error("user not authenticated ,log in")
    return;
  }
  try{
    const response=await axios.post("http://localhost:3000/user/cart",{productId,quantity},
    { headers: { Authorization: `Bearer ${token}` },})
    await fetchUserCart()
    toast.success(response.data.message);
  }catch(error){
      toast.error("failed to add to cart")
      console.error(error)
  }
}


const removeFromCart=async(productId)=>{
  const token = Cookies.get("token");
  if (!token) {
    toast.error("user not authenticated ,log in")
    return;
  }
  try{
    const response=await axios.delete("http://localhost:3000/user/cart",{data:{productId},
    headers: { Authorization: `Bearer ${token}` }})
    await fetchUserCart()
    toast.success(response.data.message);
}catch(error){
  toast.error("failed to rremove from cart")
  console.error(error)
}
}
    
  return (
    <cartContext.Provider value={{fetchUserCart,setUserCart,userCart,addToCart,removeFromCart}}>
     {children}
    </cartContext.Provider>
  )
}

export default CartProvider