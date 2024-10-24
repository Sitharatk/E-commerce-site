import {useContext} from 'react'

import womenImage from '../assets/womenImage.jpg';
import menImage from '../assets/menImage.jpg';
import sunglasses from '../assets/sunglasses.jpg';

import Lady from '../assets/Lady.jpg';
import { shopContext } from './../Context/shopContext';
import { Link} from 'react-router-dom';

function Home() {
  const {products}=useContext(shopContext)
  

  return (
    <div>
      <div className="sm:relative sm:h-96 ">
        <img src={Lady} alt="Lady" className="sm:w-full sm:h-full sm:object-cover" />
       <Link to="/collections"> <button className="absolute top-1/2 right-96 bg-black text-white px-6 py-2 hover:bg-gray-800 transition duration-300">SHOP NOW</button></Link>
      </div>


      <div className='p-7'>
      <p className='font-bold text-2xl'>CATEGORIES</p>
      </div>
      <div className='flex items-center justify-center gap-28 w-screen mb-3 mt-4 '>
        <div>
        <Link to='/catogory/men'><img src={menImage} alt="MEN" className="w-64 h-80 transition-transform duration-300 hover:scale-110"  /></Link>
        <p className='font-semibold p-4'>MEN</p>
        </div>
        <div>
        <Link to='/catogory/women'><img src={womenImage} alt="WOMEN" className="w-64 h-80 transition-transform duration-300 hover:scale-110" /> </Link>

        <p className='font-semibold p-4'>WOMEN</p>
        </div>
        <div>
        <Link to='/catogory/sunglasses'><img src={sunglasses} alt="sunglasses" className="w-64 h-80 transition-transform duration-300 hover:scale-110"  /></Link>
        <p className='font-semibold p-4'>SUNGLASSES</p>
        </div>
      </div>
    
      <div >
        <div className='p-7'>
         <p className='font-bold text-xl'> NEW ARRIVAL</p>
        </div>
      </div>
      <div>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 '>
        {
          
          products
          .filter((product)=>product.arrival=="new")
          .map((product)=>
            <Link to={`/product/${product.id}`} key={product.id}>
              
              <div className='bg-white shadow-lg rounded-lg overflow-hidden p-4 transition-transform duration-300 hover:scale-105'>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <p className='font-semibold p-2 ml-16'>{product.name}</p>
                  <p className='text-sm ml-28'>${product.price}</p>
                </div>
             
            </Link>
          )
        }
        </div>
      </div>
    </div>
  )
}

export default Home 

