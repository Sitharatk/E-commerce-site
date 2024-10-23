import { createContext ,useState,useEffect} from 'react';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
function UserProvider({ children }) {
  const [currentUser,setCurrentUser] = useState(null)

  useEffect(()=>{

    const storedUser=JSON.parse(localStorage.getItem("currentUser"))
    if(storedUser){
      setCurrentUser(storedUser)
    }
  },[])
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);
  
  return (
    <UserContext.Provider value={{currentUser,setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
