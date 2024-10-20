import {useContext} from 'react'

import womenImage from '../assets/womenImage.jpg';
import menImage from '../assets/menImage.jpg';
import sunglasses from '../assets/sunglasses.jpg';
import obey from '../assets/obey.png';
import Handm from '../assets/handm.png';
import shopify from '../assets/shopify.png';
import levis from '../assets/levis.png';
import amazon from '../assets/amazon.png';
import Lady from '../assets/Lady.jpg';
import { shopContext } from './../Context/shopContext';
import { Link} from 'react-router-dom';

function Home() {
  const {products}=useContext(shopContext)
  

  return (
    <div>
            <div className="sm:relative sm:h-96 ">
        <img src={Lady} alt="Lady" className="sm:w-full sm:h-full sm:object-cover" />
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
      {/* <div className='h-32 w-screen bg-slate-300 flex items-center justify-evenly'>
      <img src={Handm} alt="obey" className="w-20 h-16"/>
        <img src={obey} alt="obey" className="w-24 h-16"/>
        <img src={shopify} alt="obey" className="w-28 h-16"/>
        <img src={levis} alt="obey" className="w-24 h-16"/>
        <img src={amazon} alt="obey" className="w-24 h-16"/>

      </div> */}
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
              
              <div className='border  p-3 mb-2 overflow-hidden '>
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

