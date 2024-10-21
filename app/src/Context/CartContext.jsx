import { createContext, useState ,useEffect, useContext} from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';


// eslint-disable-next-line react-refresh/only-export-components
export const cartContext = createContext();

// eslint-disable-next-line react/prop-types
function CartProvider({children}) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [orderItems, setOrderItems] = useState(() => {
    const savedOrderItems = localStorage.getItem('orderItems');
    return savedOrderItems ? JSON.parse(savedOrderItems) : [];
  }); 

    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('orderItems', JSON.stringify(orderItems));
    }, [cartItems,orderItems]);

    
const {currentUser,setCurrentUser}=useContext(UserContext)
  
    const updateQuantity = (itemId, action) => {
    setCartItems((prevItems) =>{
      const updateCart=prevItems.map((item) =>item.id === itemId
       ? { ...item, quantity: action === 'increment' ? item.quantity + 1 : Math.max(1, item.quantity - 1) }: item)
       patchUpdateCart(updateCart)
       return updateCart
    });
    
    }; 

    const patchUpdateCart = async (updatedCart) => {
      if (currentUser&&currentUser.id) {
        try {
          await axios.patch(`http://localhost:5000/users/${currentUser.id}`, { cart: updatedCart });
          const updateddata={...currentUser,cart:updatedCart}
          setCurrentUser(updateddata)
          localStorage.setItem('currentUser',JSON.stringify(updateddata))
        } catch (error) {
          console.error("Error updating cart:", error);
        }
      }
    };
   
    useEffect(()=>{
      const fetchCartItems = async () => {
        if (currentUser) {
          try {
            const { data } = await axios.get(`http://localhost:5000/users/${currentUser.id}`);
            if (data) {
              setCartItems(data.cart); 
              setOrderItems(data.order)
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }
      };
      fetchCartItems()
    },[currentUser])

  const addToCart = (item) => {
      setCartItems((prevItems) => {
        const updatedCart = [...prevItems, { ...item, quantity: 1 }];
        patchUpdateCart(updatedCart);
        return updatedCart; 
      });
    };
    const patchUpdateOrder = (orderItems) => {
      axios.patch(`http://localhost:5000/users/${currentUser?.id}`, { order: orderItems });
       
    };
    useEffect(() => {
      if (currentUser!==null) {
        patchUpdateOrder(orderItems);
      }
    }, [currentUser, orderItems]);
    
  
     
    
  return (
    <cartContext.Provider value={{cartItems,addToCart,setCartItems,setOrderItems,updateQuantity,orderItems,patchUpdateCart}}>
     {children}
    </cartContext.Provider>
  )
}

export default CartProvider