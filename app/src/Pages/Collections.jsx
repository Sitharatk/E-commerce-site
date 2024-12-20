import { useContext, useEffect} from 'react'
import { shopContext } from './../Context/shopContext';
import { Link} from 'react-router-dom';


function Collections() {
  useEffect(() => {
    window.scrollTo({ top: 80, behavior: "smooth" });
  }, []);
  const {products}=useContext(shopContext)
 
  return (
    <div>
      <div className='flex items-center justify-center my-5'>
    <p className='font-bold text-3xl text-[#31180d] border-b-2 font-serif border-gray-300 pb-2'>COLLECTIONS</p>
     </div>

     <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 p-8'>
    
    {
    products.map((product) => (
  <Link to={`/product/${product._id}`} key={product._id}>
    <div className='bg-white shadow-lg rounded-lg overflow-hidden p-4 transition-transform duration-300 hover:scale-105'>
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
      <p className='font-semibold text-center text-lg'>{product.name}</p>
      <p className='text-center text-sm text-gray-600'>${product.price}</p>
    </div>
  </Link>
))}
</div>
</div>
  )
}

export default Collections