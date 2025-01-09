import {  useEffect,useState} from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../../utlities/axiosInstance';


function User() {

const [users,setUsers]=useState([])
const [loading, setLoading] = useState(true);

  
 useEffect(()=>{
 const fetchUsers=async()=>{
  try{

    const response=await axiosInstance.get("/admin/users")
    setUsers(response.data.data)

    setLoading(false)
  }catch (err) {
        console.error("Error fetching users:", err);
        setLoading(false);
      }
 }
 fetchUsers()
},[])
 
if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  return (
    <div className='p-6 ml-64'>
      <h1 className="text-2xl font-bold mb-4">CUSTOMERS LIST</h1>
    
      <div className="">
        <table className="w-full border border-gray-300">
          <thead className="border-2 border-gray-300 ">
            <tr>
              <th className="border-2 border-gray-300 p-3 text-center">ID</th>
              <th className="border-2 border-gray-300 p-3 text-center">Profile</th>
              <th className="border-2 border-gray-300 p-3 text-center">Name</th>
              <th className="border-2 border-gray-300 p-3 text-center">Role</th>
              <th className="border-2 border-gray-300 p-3 text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-300 p-3 text-center">{user._id}</td>
                <td className="border border-gray-300 p-3 text-center">
                <FontAwesomeIcon className="sm:text-xl text-md" icon={faUser} />
                </td>
                <td className="border border-gray-300 p-3 text-center">{user.name}</td>
                <td className="border border-gray-300 p-3 text-center">
                {user.isAdmin ? ( <p className="text-green-950 font-bold">Admin</p> ) : (
                <p className="text-blue-500">User</p> )}
                  </td>
                <td className="border border-gray-300 p-3 text-center">
                 <Link to={`/usersdetails/${user?._id}`} key={user._id}><button className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-black transition duration-200">
                    Edit
                  </button></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default User