import { createContext, useState ,useEffect} from 'react';

export const cartContext = createContext();
// eslint-disable-next-line react/prop-types
function CartProvider({children}) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

  
    const updateQuantity = (itemId, action) => {
      setCartItems((prevItems) =>prevItems.map((item) =>item.id === itemId
       ? { ...item, quantity: action === 'increment' ? item.quantity + 1 : Math.max(1, item.quantity - 1) }: item)
      );
    }; 
    
   
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
      };
     
    
  return (
    <cartContext.Provider value={{cartItems,addToCart,setCartItems,updateQuantity}}>
     {children}
    </cartContext.Provider>
  )
}

export default CartProvider