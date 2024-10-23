import { useState ,useEffect, useContext} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';



function Usersdetails() {
    
const {id}=useParams()
const [user,setUser]=useState(null)


useEffect(()=>{
axios.get(`http://localhost:5000/users/${id}`)
.then((response) =>setUser( response.data ))
.catch((error)=>console.log(error))

},[id])


const handleRole = async () => {
  try {
       await axios.patch(`http://localhost:5000/users/${id}`, { isAdmin: !user.isAdmin});
        setUser((prevUser) => ({...prevUser,
            isAdmin: !user.isAdmin
        }));
    } catch (error) {
        console.error('Error updating user role', error);
    }
};


const handleBlock = async () => {
    try {
         await axios.patch(`http://localhost:5000/users/${id}`, { isBlock: !user.isBlock});
          setUser((prevUser) => ({...prevUser,
              isBlock: !user.isBlock
          }));
      } catch (error) {
          console.error('Error updating user role', error);
      }
  };
if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-col ml-64">
        <div className=" flex items-center justify-evenly p-10">
        <div className="p-4 border-r border-gray-300">
        <FontAwesomeIcon className="sm:text-3xl text-xl" icon={faUser} />
             </div>
            <div className="pr-6">
            <p className="font-bold">Name: <span className="font-normal">{user.username}</span></p>
            <p className="font-bold">Email: <span className="font-normal">{user.email}</span></p>
              <p className="font-bold">
                 Role:{" "}
                {user.isAdmin ? (
                 <span className="font-normal ">admin</span>) : (
             <span className="font-normal ">User</span> )}
             </p>
                
            </div>

        </div>
        <div>
        <p className="mb-4 font-bold">Orders:</p>
        <table className="w-full border border-gray-300 text-left">
         
            <thead>
            <tr className="border-b text-center">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Product Name</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Price</th>
            </tr>
          </thead>
            <tbody>
        
          {user.order.map((order) => 
            order.map((item) => (
                <tr key={item.id} className="border-b text-center">
                <td className="p-3 border">{item.id}</td>
                <td className="p-3 border"><div className="flex items-center justify-evenly mr-2"><img className='w-10 h-10 object-cover 'src={item.image}/>{item.name}</div></td>
                <td className="p-3 border">{item.quantity}</td>
                <td className="p-3 border">${item.price}</td>
              </tr>
            ))
          )}
       </tbody>
       </table>
      

       </div>
      <div className="flex items-center space-x-4 mt-6 ml-96">
        <button onClick={handleRole}className="bg-slate-900  text-white py-2 px-4 rounded hover:bg-gray-400 transition duration-200">
          Change Role
        </button>
        <button onClick={handleBlock} 
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-black transition duration-200">
        {user.isBlock ? 'Unblock' : 'Block'}
                </button>
    </div>
    </div>
  )
}

export default Usersdetails