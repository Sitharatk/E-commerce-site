import { useContext, useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { cartContext } from './../Context/CartContext';
import { Link} from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WishlistContext } from '../Context/WishlistContext'
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axiosErrorManager from '../../utlities/axiosErrorManager';
import axios from 'axios';
import { shopContext } from '../Context/shopContext';



function Product() {
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart,userCart } = useContext(cartContext);

  const {products}=useContext(shopContext)
  const { id } = useParams();
  const [added, setAdded] = useState(false);
  const {currentUser}=useContext(UserContext);
 
  const [product,setProduct]=useState(null)
  const navigate=useNavigate()

 
useEffect(()=>{
  const fetchProduct=async()=>{
    try{
    const response = await axios.get(`http://localhost:3000/user/product/${id}`)
    console.log(response.data.data)
   setProduct(response.data.data)
    }catch(error){
      console.error(axiosErrorManager(error))
    }
  }
  fetchProduct()
},[id])

  useEffect(() => {
    if (product && Array.isArray(userCart)) {
      const includedProduct = userCart.some(item => item.productId._id === id);
      setAdded(includedProduct);
    }
  }, [id, product, userCart]);

  const toggleWishlist = (product) => {
    if(currentUser){
    const isInWishlist = wishlistItems.some((item) => item._id === product._id);
    if (isInWishlist) {
      removeFromWishlist(product._id); // Remove from wishlist
    } else {
      addToWishlist(product._id); // Add to wishlist
    }}  
  else {
      toast("Please login")
      navigate('/login');
    }
  };

  const handleAddToCart = () => {
    if (currentUser) {
      addToCart(product._id,1);
      
    } else {
      toast("Please login")
      navigate('/login');
    }
  };

 

//   eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.scrollTo(0, 0);
 }, [id]); 
 const rating = Math.floor(Math.random() * (90 - 10)) + 10; // Random rating between 10 and 90
 const starCount = Math.floor(rating / 20); // Assuming 5 stars as maximum, so 20 rating per star
 if (!product) {
  return <div>Loading...</div>;
}

  return (
    <>
    {!product ? (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Product not found!</p>
      </div>
    ) : (
      <div className="flex flex-col lg:flex-row items-center justify-center p-6 lg:p-14 bg-white">
        <div className="w-full lg:w-64 h-auto lg:pr-4 mb-6 lg:mb-0">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-sm" />
        </div>
        <div className="flex flex-col pl-0 lg:pl-4 text-center lg:text-left">
          <p className="font-bold text-xl lg:text-2xl text-[#31180d] mb-2">{product.name}</p>
          <p className="text-lg text-[#522815] mb-2">${product.price}</p>
          <p className="text-sm text-gray-500 mb-4">{product.description}</p>
          <p className="text-sm text-[#522815] mb-4 flex justify-center lg:justify-start">
            <span className="text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={index < starCount ? "text-[#522815]" : "text-gray-300"}
                />
              ))}
            </span>
            | Reviews: {Math.floor(Math.random() * (50 - 10)) + 10}
          </p>
          <div className="flex items-center justify-center lg:justify-start space-x-5">
            {added ? (
              <Link to="/cart">
                <button className="bg-[#522815] text-white w-40 px-2 py-1 rounded hover:bg-[#a78475] transition duration-300">
                  Go To Cart
                </button>
              </Link>
            ) : (
              <button onClick={handleAddToCart} className="bg-[#522815] text-white w-40 px-2 py-1 rounded hover:bg-[#a5897c] transition duration-300">
                Add To Cart
              </button>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className="text-2xl text-[#31180d] hover:text-[#b17b64] transition duration-300"
            >
              {wishlistItems.some((item) => item._id === product._id) ? (
                <FaHeart className="text-[#31180d]" />
              ) : (
                <FaRegHeart />
              )}
            </button>
          </div>
        </div>
      </div>
    )}
    <div className="relative flex items-center font-sans mt-8 mb-8 px-5 py-4">
      <p className="text-2xl font-semibold text-[#31180d] relative z-10 bg-white px-4">RELATED PRODUCTS</p>
      <div className="absolute inset-0 flex items-center mb-2">
        <div className="w-full border-t border-[#31180d]"></div>
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-6">
      {products
        .filter((item) => item.category === product.category && item._id !== product._id)
        .slice(0, 6)
        .map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} className="no-underline">
            <div
              key={product._id}
              className="bg-white mb-8 rounded-lg shadow-md overflow-hidden w-full sm:w-48 transition-transform duration-300 hover:scale-105"
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-3">
                <p className="font-semibold text-center text-lg text-[#31180d]">{product.name}</p>
                <p className="text-sm text-center text-[#31180d]">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  </>
);
}

export default Product;