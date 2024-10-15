import React, { useEffect, useState } from 'react'
import axios from 'axios'
import womenImage from '../assets/womenImage.jpg';
import menImage from '../assets/menImage.jpg';
import sunglasses from '../assets/sunglasses.jpg';
import obey from '../assets/obey.png';
import Handm from '../assets/handm.png';
import shopify from '../assets/shopify.png';
import levis from '../assets/levis.png';
import amazon from '../assets/amazon.png';


function Home() {
  return (
    <div>
      <div className='p-7'>
      <p className='font-bold text-xl'>CATEGORIES</p>
      </div>
      <div className='flex items-center justify-center gap-28 w-screen mb-3 mt-4 '>
        <div>
        <img src={menImage} alt="MEN" className="w-64 h-80"  />
        <p className='font-semibold p-4'>MEN</p>
        </div>
        <div>
        <img src={womenImage} alt="WOMEN" className="w-64 h-80" /> 

        <p className='font-semibold p-4'>WOMEN</p>
        </div>
        <div>
        <img src={sunglasses} alt="sunglasses" className="w-64 h-80"  />
        <p className='font-semibold p-4'>SUNGLASSES</p>
        </div>
      </div>
      <div className='h-32 w-screen bg-slate-300 flex items-center justify-evenly'>
      <img src={Handm} alt="obey" className="w-20 h-16"/>
        <img src={obey} alt="obey" className="w-24 h-16"/>
        <img src={shopify} alt="obey" className="w-28 h-16"/>
        <img src={levis} alt="obey" className="w-24 h-16"/>
        <img src={amazon} alt="obey" className="w-24 h-16"/>

      </div>
      <div >
        <div className='p-7'>
         <p className='font-bold text-xl'> NEW ARRIVAL</p>
        </div>
      </div>
    </div>
  )
}

export default Home