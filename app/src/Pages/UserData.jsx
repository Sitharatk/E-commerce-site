import axios from 'axios';
import { useContext,  } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserData() {
  const {currentUser,setCurrentUser}=useContext(UserContext)



  const navigate=useNavigate()

  const userLogout=async()=>{
    try{
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`,{},{ withCredentials: true })
      toast.success("logout successful")
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


// import  { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { WishlistContext } from '../Context/WishlistContext';


// function Wishlist() {

//       const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
//   return (
//     <div className="p-6">
//           <h2 className="text-2xl font-bold text-[#522815] font-serif mb-4">Wishlist</h2>
//           {wishlistItems.length === 0 ? (
//             <p className="text-center text-gray-600 text-lg">
//               Your wishlist is empty. Browse our <Link to="/" className="text-amber-800 hover:underline">products</Link>.
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {wishlistItems.map((product,index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <Link to={`/product/${product._id}`} className="no-underline">
//                     <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
    
//                   </Link>
//                   <div className="p-3">
//                     <div className="flex justify-between items-center">
//                       <p className="font-semibold text-lg text-gray-800">{product.name}</p>
//                       <button
//                         onClick={() => removeFromWishlist(product._id)}
//                         className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-amber-950 transition duration-300"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                     <p className="text-sm text-gray-600">${product.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     }

// export default Wishlist