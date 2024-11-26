import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const shopContext = createContext();

// eslint-disable-next-line react/prop-types
const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
 

  useEffect(() => {
    axios.get("http://localhost:4000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

 

  return (
    <shopContext.Provider value={{products}}>
      {children}
    </shopContext.Provider>
  );
};

export default ShopProvider;
