import { Link} from 'react-router-dom';
import { useContext,  } from 'react';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

import axiosInstance from '../../../utlities/axiosInstance';
import { toast } from 'react-toastify';


function Sidebar() {

  const navigate = useNavigate()
  const {setCurrentUser}=useContext(UserContext)
  
  const adminLogout =async()=>{

    try{
      await axiosInstance.post('/auth/logout',{},{ withCredentials: true })
      toast.success("logout successful")
      setCurrentUser(null);
      navigate('/')
    }catch(error){
      toast.error("error in login out")
      console.error(error)
    }
    }
  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-slate-700 text-white flex flex-col p-6 ">
      <div className="flex items-center mb-8">
        <i className="bx bxs-pyramid text-3xl sm:text-5xl text-white mr-3"></i>
        <p className="text-2xl font-bold">Admin Hub</p>
      </div>
      <hr className="border-gray-500 mb-6" />

      <div className="flex flex-col space-y-7">
        
       <Link to='/dashboard'> <button className="text-left text-lg hover:bg-slate-600 p-2 rounded transition duration-300">Dashboard</button></Link> 
       <Link to='/user' ><button className="text-left text-lg hover:bg-slate-600 p-2 rounded transition duration-300">User Management</button></Link> 
       <Link to='/productmanagment' > <button className="text-left text-lg hover:bg-slate-600 p-2 rounded transition duration-300">Product Management</button></Link> 
       <Link to='/ordermanagment' > <button className="text-left text-lg hover:bg-slate-600 p-2 rounded transition duration-300">Orders</button></Link> 
        <button onClick={adminLogout} className="w-full  font-semibold text-black text-center text-lg bg-slate-200 hover:bg-black hover:text-white p-2 rounded transition duration-300 ">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

