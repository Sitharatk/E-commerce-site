import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const shopContext = createContext();

// eslint-disable-next-line react/prop-types
const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/products");
        setProducts(response.data.data);
        // console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <shopContext.Provider value={{ products }}>
      {children}
    </shopContext.Provider>
  );
};

export default ShopProvider;

