import React, { useContext, useState } from 'react';
import { shopContext } from '../../Context/shopContext';
import { Link} from 'react-router-dom';
import axios from 'axios';

function ProductManagement() {
  const {products}=useContext(shopContext)

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between ml-64">
        <h1 className="text-2xl font-bold">PRODUCTS</h1>
        <hr/>
     
       
       <Link to='/addproduct'> <button className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-slate-400 transition duration-200">
      Add Product
    </button></Link>
    
      </div>
      <div className="ml-64">
        <table className="w-full border border-gray-300">
          <thead className="border-2 border-gray-300 ">
            <tr>
              <th className="border-2 border-gray-300 p-3 text-center">ID</th>
              <th className="border-2 border-gray-300 p-3 text-center">Image</th>
              <th className="border-2 border-gray-300 p-3 text-center">Name</th>
              <th className="border-2 border-gray-300 p-3 text-center">Price</th>
              <th className="border-2 border-gray-300 p-3 text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product)=>(
                <tr  key={product.id}>
                  <td className="border border-gray-300 p-3 text-center">{product.id}</td>
                  <td className="border border-gray-300 p-3 text-center">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mx-auto" />
                  </td>
                  <td className="border border-gray-300 p-3 text-center">{product.name}</td>
                  <td className="border border-gray-300 p-3 text-center">${product.price}</td>
                  <td className="border border-gray-300 p-3 text-center"> <Link to={`/edit/${product?.id}`} ><button className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-black transition duration-200">
                  Edit</button></Link></td>
                 </tr>)
              )
            }
          

          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default ProductManagement;

