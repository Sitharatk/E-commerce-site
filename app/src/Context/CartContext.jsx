import { createContext, useState ,useEffect, useContext} from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axiosErrorManager from '../../utlities/axiosErrorManager';


// eslint-disable-next-line react-refresh/only-export-components
export const cartContext = createContext();

// eslint-disable-next-line react/prop-types
function CartProvider({children}) {


const [userCart,setUserCart]=useState([])   
const {currentUser}=useContext(UserContext)



const cartItemCalculate = () => {
  return userCart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
};

const fetchUserCart = async () => {
  if (!currentUser) return;
  const token = Cookies.get("token");
  if (!token) return;
    try {
      const {data}= await axios.get(`http://localhost:3000/user/cart`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data.products)
      setUserCart(data.products || []); 
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  
};
useEffect(()=>{fetchUserCart()},[currentUser])

const addToCart=async(productId,quantity)=>{
  if (!productId || quantity < 1) {
    toast.error("Invalid product or quantity");
    return;
}

  const token = Cookies.get("token");
  if (!token) {
    toast.error("user not authenticated ,log in")
    return;
  }
  try {
    const response = await axios.post("http://localhost:3000/user/cart", { productId, quantity }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    await fetchUserCart();
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add to cart");
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
   
const updateQuantity=async(productId, quantity)=>{
  if (quantity < 1) return;  
  const updatedCart = userCart.map((item) => {
    if (item.productId._id === productId) {
      return { ...item, quantity };
    }
    return item;
});
update(productId, quantity);
setUserCart(updatedCart);
}

const update = async (productId, quantity) => {
  try {
       const token = Cookies.get("token");
       const response=await axios.post('http://localhost:3000/user/cart',{productId,quantity},
           { headers: { Authorization: `Bearer ${token}` }, } );
           console.log(response.data)
   } catch (error) {
       console.error(axiosErrorManager(error));
   }
};

  return (
    <cartContext.Provider value={{fetchUserCart,cartItemCalculate,setUserCart,userCart,addToCart,removeFromCart,updateQuantity}}>
     {children}
    </cartContext.Provider>
  )
}

export default CartProvider