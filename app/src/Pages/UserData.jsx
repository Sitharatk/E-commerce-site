import axios from 'axios';
import { useContext,  } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utlities/axiosInstance';
import Cookies from 'js-cookie';
function UserData() {
  const {currentUser,setCurrentUser}=useContext(UserContext)



  const navigate=useNavigate()

  const userLogout=async()=>{
    try{
      await axiosInstance.post(`/auth/logout`,{},{ withCredentials: true })
      toast.success("logout successful")
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      Cookies.remove("currentUser");
      setCurrentUser(null);
      
      navigate('/')
    }catch(error){
      toast.error("error in login out")
      console.error(error)
    }
    
  }
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-8 w-96">
  
      <p className="text-2xl font-bold text-[#31180d] text-center mb-6">
        Hello, {currentUser?.name || 'User'}!
      </p>
      <Link to="/orders">
        <div className="border border-[#31180d] rounded-lg px-6 py-4 mb-4 text-lg font-semibold text-center text-[#31180d] hover:bg-gray-100 transition duration-300">
          My Orders
        </div>
      </Link>

      <button
        onClick={userLogout}
        className="w-full px-6 py-3 bg-[#31180d] text-white rounded-lg text-lg font-semibold hover:bg-[#977566] transition duration-300 mb-4"
      >
        Log Out
      </button>

      {currentUser?.isAdmin &&(
        <Link to="/dashboard">
          <button className="w-full px-6 py-3 bg-[#31180d] text-white rounded-lg text-lg font-semibold hover:bg-[#b4978a] transition duration-300">
            Go To Admin Hub
          </button>
        </Link>
      )}
    </div>
  </div>

  );
}

export default UserData;

