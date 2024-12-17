import { createContext ,useState,useEffect} from 'react';
import Cookies from 'js-cookie'; 
import axios from 'axios';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
function UserProvider({ children }) {
  const [currentUser,setCurrentUser] = useState(null)
useEffect(()=>{
  const user=Cookies.get("currentUser")
  if(user){
    try{
      setCurrentUser(JSON.parse(user))
    }catch(error) {
      console.error('Failed to parse user cookie:', error);
    }
  }
},[])
  
const loginUser=async(email,password)=>{
 try{ 
  const response=await axios.post('http://localhost:3000/auth/login',{email,password},{withCredentials:true})
 
  const { user, token } = response.data;

  setCurrentUser(user);
  Cookies.set('currentUser', JSON.stringify(user), { expires: 7 });
  Cookies.set('token', token, { expires: 7 });
} catch (error) {
  console.error('Login failed:', error);
}
};

  return (
    <UserContext.Provider value={{currentUser,setCurrentUser,loginUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;



