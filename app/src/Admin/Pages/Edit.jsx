import React, { useContext, useState ,useEffect} from 'react';
import { shopContext } from '../../Context/shopContext';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

function Edit() {
    const {id} =useParams()
    const {products,setProducts}=useContext(shopContext)

    const [name,setName]=useState('')
    const [imageurl,setImageurl]=useState('')
    const [description,setDescritption]=useState('')
    const [price,setPrice]=useState('')
    const navigate = useNavigate()
       
    const product = products.find((item) => item.id === id);
   
    // eslint-disable-next-line no-undef
    useEffect(() => {
        if (product) {
            setName(product.name);
            setImageurl(product.image);
            setDescritption(product.description);
            setPrice(product.price);
        }
    }, [product]);
    const handleSave = async () => {
        if (product) {
            try {
                const updatedProduct = { ...product, name, description, price, image: imageurl };
                await axios.patch(`http://localhost:5000/products/${product.id}`, updatedProduct);
                setProducts((prevProducts) => 
                    prevProducts.map((item) => (item.id === product.id ? updatedProduct : item))
                );
                // toast("product Updated")
                navigate('/productmanagment');
            } catch (error) {
                console.error('Error updating the product:', error);
            }
        }
    };

    if (!product) {
        return <p>Product not found</p>;
    }

    const handleRemove = async () => {
        try {
              await axios.delete(`http://localhost:5000/products/${product.id}`)
              setProducts((preitems)=>preitems.filter(item=>item.id!==product.id))
            //   toast("product Deleted")
              navigate('/productmanagment')
        }catch (error) {
            console.error('Error deleting the product:', error);
        }

 }
   

  return (
    <div className="p-6 ml-64">
       
    <h1 className="text-2xl font-bold mb-4">EDIT PRODUCT</h1>
    <hr></hr>

    <div className="flex ml-15 mt-11 p-2 space-x-11">
        <div className="w-1/2"><img src={product.image} alt={product.name}
    className="w-96 h-96 object-cover rounded border border-gray-300 shadow-md mb-4 "
                    />
        </div>
        <div className="w-full mr-20">
            <label className="block text-lg font-semibold mb-1">Name:</label>
            <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <label className="block text-lg font-semibold mb-1">Image URL:</label>
            <input
                type="text"
               value={imageurl} onChange={(e) => setImageurl(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <label className="block text-lg font-semibold mb-1">Description:</label>
            <input
                type="text"
                value={description} onChange={(e) => setDescritption(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <label className="block text-lg font-semibold mb-1">Price:</label>
            <input
                type="number"
                value={price} onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <div className="flex gap-4 mt-4 ml-96 ">
            <button  onClick={handleSave}className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Save</button>
            <button onClick={handleRemove} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Delete</button>
            </div>
        </div>
    </div>
</div>
);
}

export default Edit