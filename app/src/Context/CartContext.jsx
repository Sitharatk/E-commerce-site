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
  
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
      };
      console.log(cartItems)
  return (
    <cartContext.Provider value={{cartItems,addToCart,setCartItems}}>
     {children}
    </cartContext.Provider>
  )
}

export default CartProvider