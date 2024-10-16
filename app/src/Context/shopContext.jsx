import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const shopContext = createContext();

// eslint-disable-next-line react/prop-types
const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
 

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

 
  const value = {
    products
  };


  return (
    <shopContext.Provider value={value}>
      {children}
    </shopContext.Provider>
  );
};

export default ShopProvider;
