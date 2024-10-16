
import { useContext, useState,useEffect} from 'react'
import { shopContext } from './../Context/shopContext';
import { useParams } from 'react-router-dom';
import { cartContext } from './../Context/CartContext';
import { Link} from 'react-router-dom';



function Product() {
  const { products } = useContext(shopContext);
  const { addToCart } = useContext(cartContext);
  const { id } = useParams();
  const [added, setAdded] = useState(false);

 
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Product not found!</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    console.log(product); 
  };

  
  return (
   
    <div className='flex flex-row items-center justify-center p-14 bg-white'>
    <div className='w-64 h-auto  pr-4'>
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-sm" />
    </div>
    <div className='flex flex-col pl-4'>
      <p className='font-bold text-2xl text-gray-800 mb-2'>{product.name}</p>
      <p className='text-lg text-gray-600 mb-2'>${product.price}</p>
      <p className='text-sm text-gray-500 mb-4'>{product.description}</p>
      
      {/* <p className='text-sm text-gray-700 mb-2' >Rating:{ Math.floor(Math.random() * (100 - 10 + 1)) + 10} | Reviwes: { Math.floor(Math.random() * (50 - 10 + 1)) + 10}</p> */}
      {added?
      <Link to='/cart'><button  className='bg-blue-500 text-white w-40 px-2 py-1 rounded hover:bg-blue-600 transition duration-300 '>
        Go To Cart
      </button></Link>:<button onClick={handleAddToCart} className='bg-blue-500 text-white w-40 px-2 py-1 rounded hover:bg-blue-600 transition duration-300 '>
        Add To Cart
      </button>
  }
    </div>
  </div>
  

  )
}

export default Product