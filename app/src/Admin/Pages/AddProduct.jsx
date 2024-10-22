import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    
    const [newproduct,setNewproduct]=useState({
     name:'',
     imageurl:'',
     description:'',
     price:''

    })
    const navigate=useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewproduct({ ...newproduct, [name]: value });
      };
      const handleSubmit=async ()=>{
        try{
            await axios.post(`http://localhost:5000/products`,newproduct)
            toast("product added")
            navigate('/productmanagment')

        }
        catch (error) {
            console.error('Error updating the product:', error);
        }
      }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-7">ADD PRODUCTS</h1>
      <hr></hr>
      <div className="space-y-5 mt-8">
        <div>
          <label className=" mb-1 font-semibold">Name:</label>
          <input type="text"  name="name" className="border border-gray-300 p-2 w-full rounded mt-2" placeholder="Enter product name"
          onChange={handleChange} value={newproduct.name} />
        </div>
        <div>
          <label className=" mb-1 font-semibold">Image URL:</label>
          <input type="text"   name="imageurl" className="border border-gray-300 p-2 w-full rounded mt-2"
            placeholder="Enter image URL"  onChange={handleChange} value={newproduct.imageurl}
          />
        </div>
        <div>
          <label className="mb-1 font-semibold">Description:</label>
          <input type="text"   name="description" className="border border-gray-300 p-2 w-full rounded mt-2"
            placeholder="Enter product description"  onChange={handleChange} value={newproduct.description}
          />
        </div>
        <div >
          <label className="mb-1 font-semibold ">Price:</label>
          <input type="number"   name="price" className="border border-gray-300 p-2 w-full rounded mt-2"
            placeholder="Enter product price"  onChange={handleChange} value={newproduct.price}
          />
        </div>
        <div className='mt-4'>
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-400 transition duration-200 m"
         onClick={handleSubmit}>
          ADD
        </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct