import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; 
import axios from 'axios';
import { toast } from 'react-toastify';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const user = Cookies.get("currentUser");
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
      }
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        { email, password },
        { withCredentials: true }
      );
      
    
  
      const { currentUser, token } = response.data;
  
      if (response.data.success) {
        setCurrentUser(currentUser); 
        Cookies.set('currentUser', JSON.stringify(currentUser), { expires: 7 });
        Cookies.set('token', token, { expires: 7 });
       toast.success('Login successful');
        return response.data;
      } else {
        toast.error(response.data.message); 
      }
    } catch (error) {
      console.error('Login failed:', error);
      
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/admin",
        { email, password },
        { withCredentials: true }
      );
      console.log(res);
  
      const admin = Cookies.get("currentUser");
      if (admin) {
        setCurrentUser(JSON.parse(admin));
        toast.success("Admin logged in successfully");
      } else {
        toast.error("Failed to retrieve admin details.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw the error to let the caller handle it, if necessary.
    }
  };
  
  
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loginUser,loginAdmin}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;




