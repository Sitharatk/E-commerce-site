
import { useContext, useState,useEffect} from 'react'
import { shopContext } from './../Context/shopContext';
import { useNavigate, useParams } from 'react-router-dom';
import { cartContext } from './../Context/CartContext';
import { Link} from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WishlistContext } from '../Context/WishlistContext'

import { faStar } from '@fortawesome/free-solid-svg-icons';



function Product() {
  const { products } = useContext(shopContext);
  const { addToCart,cartItems } = useContext(cartContext);
  const { id } = useParams();
  const [added, setAdded] = useState(false);
  const {currentUser}=useContext(UserContext);
  const {addToWishlist}=useContext(WishlistContext)
  const navigate=useNavigate()

 
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Product not found!</p>
      </div>
    );
  }
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    if(product&&cartItems){
    let includedProduct=cartItems?.some(items=>items.id===product.id)
    setAdded(includedProduct)}
  },[product,cartItems])

  const handleAddToCart = () => {
    if (currentUser) {
      addToCart(product);
      
    } else {
      toast("Please login")
      navigate('/login');
    }
  };

  const handleAddToWishlist = () => {
    if (currentUser) {
      addToWishlist(product);
   
    } else {
      toast("Please login");
      navigate('/login');
    }
  };
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.scrollTo(0, 0);
 }, [id]); 
 const rating = Math.floor(Math.random() * (90 - 10)) + 10; // Random rating between 10 and 90
 const starCount = Math.floor(rating / 20); // Assuming 5 stars as maximum, so 20 rating per star
 
  return (
   <>
    <div className='flex flex-row items-center justify-center p-14 bg-white'>
        <div className='w-64 h-auto pr-4'>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-sm" />
        </div>
        <div className='flex flex-col pl-4'>
          <p className='font-bold text-2xl text-[#31180d]  mb-2'>{product.name}</p>
          <p className='text-lg text-[#522815]  mb-2'>${product.price}</p>
          <p className='text-sm text-gray-500 mb-4'>{product.description}</p>
          <div className='flex'>
            <p>Size:</p>
        
            <div><p>S</p></div>
            <div><p>M</p></div>
            <div><p>L</p></div>
          </div>
          <p className='text-sm text-[#522815]  mb-3'>
           
            <span className="text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={index < starCount ? "text-[#522815] " : "text-gray-300"}
                />
              ))}
            </span>
            | Reviews: {Math.floor(Math.random() * (50 - 10)) + 10}
          </p>
          
          <div className='flex items-center space-x-5'>
            {added ? (
              <Link to='/cart'>
                <button className='bg-[#522815]  text-white w-40 px-2 py-1 rounded hover:bg-[#a78475] transition duration-300'>
                  Go To Cart
                </button>
              </Link>
            ) : (
              <button onClick={handleAddToCart} className='bg-[#522815]  text-white w-40 px-2 py-1 rounded hover:bg-[#a5897c]  transition duration-300'>
                Add To Cart
              </button>
            )}
            <button onClick={handleAddToWishlist}> 
              <FontAwesomeIcon className="text-[#522815]  text-3xl hover:text-[#aa8c7f] transition duration-300" icon={faHeart} />
            </button>
          </div>
        </div>
      </div>

   <div className="relative flex items-center font-sans mt-8 mb-8 px-5 py-4 ">
   <p className="text-2xl font-semibold text-[#31180d] relative z-10 bg-white px-4">RELATED PRODUCTS</p>
   <div className="absolute inset-0 flex items-center mb-2">
     <div className="w-full border-t border-[#31180d]"></div>
   </div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 px-6 ">
 { products. filter((item) => item.category === product.category  && item.id !== product.id ).slice(0, 6)
   .map((product) => (
     <Link to={`/product/${product.id}`} key={product.id} className='no-underline'>
     <div key={product.id} className="bg-white mb-8 rounded-lg shadow-md  overflow-hidden w-48 transition-transform duration-300 hover:scale-105">
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
  )
}

export default Product