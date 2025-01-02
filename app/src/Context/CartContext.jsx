import { createContext, useState ,useEffect, useContext} from 'react';
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';
import axiosErrorManager from '../../utlities/axiosErrorManager';
import axiosInstance from '../../utlities/axiosInstance';


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
try {
      const {data}= await axiosInstance.get(`/user/cart`);
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
  try {
 await axiosInstance.post("/user/cart",{ productId, quantity });
  
    await fetchUserCart();
    // toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add to cart");
  }
  
}


const removeFromCart=async(productId)=>{
  
  try{
    const response=await axiosInstance.delete("/user/cart",{data:{productId},})
    await fetchUserCart()
    toast.success(response.data.message);
}catch(error){
  toast.error("failed to remove from cart")
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

       const response=await axiosInstance.post('/user/cart',{productId,quantity} ,);
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