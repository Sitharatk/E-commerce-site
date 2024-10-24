
import { useContext,  } from 'react';
import { UserContext } from '../Context/UserContext';
import { cartContext } from './../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function UserData() {
  const {currentUser,setCurrentUser}=useContext(UserContext)
  const {setCartItems,setOrderItems}=useContext(cartContext)
  const navigate=useNavigate()

  const userLogout=()=>{
    setCurrentUser(null)
    setCartItems([])
    setOrderItems([])
   localStorage.removeItem('currentUser')
    localStorage.removeItem('cartItems')
  localStorage.removeItem('orderItems')
  navigate('/')
    
  }
  

  return (
    <div className="flex items-center justify-center h-80 bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg border border-white p-6 w-96">
      <p className="text-2xl font-semibold text-gray-800 mb-6">Hello, {currentUser?.username || 'User'}!</p>
      
      <Link to='/orders'><div className="border border-gray-300 rounded-lg px-8 py-6 mb-4 text-xl font-bold text-gray-800 ">
        My Orders
      </div></Link>
      
      <button onClick={userLogout} className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-600 transition duration-300 ">
        Log Out
      </button>
       {currentUser&&currentUser.isAdmin?
      (<Link to='/dashboard'><button className="px-6 ml-14 py-3 bg-black text-white rounded-lg hover:bg-gray-600 transition duration-300 ">
       Go To AdminHub
      </button></Link>):(null)
  }
    </div>
    
  </div>
  
  

  );
}

export default UserData;
