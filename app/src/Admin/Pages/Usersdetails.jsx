import { useState ,useEffect} from "react"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from "../../../utlities/axiosInstance";
import { toast } from "react-toastify";



function Usersdetails() {
    
const {id}=useParams()
const [user,setUser]=useState(null)
const [loading, setLoading] = useState(true)
const [orders, setOrders] = useState([]);

useEffect(()=>{
  const fetchUser=async()=>{
    try{
  
      const response=await axiosInstance.get(`/admin/user/${id}`)
      setUser(response.data.data)
      console.log(response.data.data)
      setLoading(false)
    }catch (err) {
      console.error("Error fetching user by ID:", err);
          setLoading(false);
        }
   }

   const fetchuserOrder=async()=>{
    try{
      const response= await axiosInstance.get(`/admin/orders/${id}`)
      setOrders(response.data.data|| []);
      console.log(response.data.data)
    
    }catch (error) {
      console.error("Failed to fetch orders:", error);
    }finally {
      setLoading(false);
    }
   }

   if (id) {
    fetchUser();
    fetchuserOrder();
  }

},[id])





const handleBlock = async (id) => {
    try {
       const response=  await axiosInstance.patch(`/admin/users/${id}`, {},);
          setUser(response.data.data);
          toast.success(response.data.message);
      } catch (error) {
          console.error('Error updating user role', error);
      }
  };
if (!user) {
    return <div>Loading...</div>; 
  }

  if (loading) return <p>Loading...</p>;
  return (
    <div className="flex flex-col ml-64">
        <div className=" flex items-center justify-evenly p-10">
        <div className="p-4 border-r border-gray-300">
        <FontAwesomeIcon className="sm:text-3xl text-xl" icon={faUser} />
             </div>
            <div className="pr-6 sapce-y-2">
            <p className="font-bold">Name: <span className="font-normal">{user.name}</span></p>
            <p className="font-bold">Email: <span className="font-normal">{user.email}</span></p>
              <p className="font-bold">
                 Role:{" "}
                {user.isAdmin ? (
                 <span className="font-normal ">admin</span>) : (
             <span className="font-normal ">User</span> )}
             </p>
           
             {!user.isAdmin && (
  <button 
    onClick={() => handleBlock(user._id)}
    className="bg-gray-500 text-white py-2 px-4 mt-4 rounded hover:bg-black transition duration-200">
    {user.isBlock ? 'Unblock' : 'Block'}
  </button>
)}

            </div>

        </div>
        <div>
        <p className="mb-4 font-bold">Orders:</p>
       { orders.length>0?(
        <table className="w-full border border-gray-300 text-left">
         
            <thead>
            <tr className="border-b text-center">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Product Name</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">payment</th>
            </tr>
          </thead>
            <tbody>
        
            {
  orders.map((order) =>
    order.products?.map((item) => (
      <tr key={item._id} className="border-b text-center">
        <td className=" border">{item._id}</td>
        <td className="p-3 border">
          <div className="flex items-center justify-evenly mr-2">
            <img className="w-10 h-10 object-cover" src={item.productId.image} alt={item.productId.name} />
            {item.productId.name}
          </div>
        </td>
        <td className="p-3 border">{item.quantity}</td>
        <td className="p-3 border">${item.productId.price}</td>
        <td className="p-3 border">{order.shippingStatus}</td> 
        <td className="p-3 border">{order.paymentStatus}</td> 
      </tr>
    ))
  )
}


       </tbody>
       </table>
        ):(<p className="text-center text-red-500 text-xl font-semibold mt-5">No orders found</p>

        )} 
      
       </div>
      
    </div>
  )
}

export default Usersdetails