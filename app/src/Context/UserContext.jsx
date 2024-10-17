import React, { createContext ,useState} from 'react';

export const UserContext = createContext();

function UserProvider({ children }) {
  const [currentUser,setCurrentUser] = useState(null)
  
  return (
    <UserContext.Provider value={{currentUser,setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
