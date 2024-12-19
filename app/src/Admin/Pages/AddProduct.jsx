import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utlities/axiosInstance';

function AddProduct() {
  const [newproduct, setNewproduct] = useState({
    name: '',
    image: null,
    description: '',
    price: 0,
    category: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewproduct({ ...newproduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewproduct((prevValues) => ({
      ...prevValues,
      image: e.target.files[0], // File object
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newproduct.name);
      formData.append('image', newproduct.image);
      formData.append('description', newproduct.description);
      formData.append('price', newproduct.price);
      formData.append('category', newproduct.category);

      await axiosInstance.post(`/admin/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Ensure token is defined
        },
      });
      navigate('/productmanagment');
    } catch (error) {
      console.error('Error adding the product:', error);
    }
  };

  return (
    <div className="p-6 ml-64">
      <h1 className="text-2xl font-bold mb-7">ADD PRODUCTS</h1>
      <hr />
      <div className="space-y-5 mt-8">
        <div>
          <label className="mb-1 font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            className="border border-gray-300 p-2 w-full rounded mt-2"
            placeholder="Enter product name"
            onChange={handleChange}
            value={newproduct.name}
          />
        </div>
        <div>
          <label className="mb-1 font-semibold">Image:</label>
          <input
            type="file"
            name="image"
            className="border border-gray-300 p-2 w-full rounded mt-2"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label className="mb-1 font-semibold">Description:</label>
          <input
            type="text"
            name="description"
            className="border border-gray-300 p-2 w-full rounded mt-2"
            placeholder="Enter product description"
            onChange={handleChange}
            value={newproduct.description}
          />
        </div>
        <div>
          <label className="mb-1 font-semibold">Category:</label>
          <input
            type="text"
            name="category"
            className="border border-gray-300 p-2 w-full rounded mt-2"
            placeholder="Enter product category"
            onChange={handleChange}
            value={newproduct.category}
          />
        </div>
        <div>
          <label className="mb-1 font-semibold">Price:</label>
          <input
            type="number"
            name="price"
            className="border border-gray-300 p-2 w-full rounded mt-2"
            placeholder="Enter product price"
            onChange={handleChange}
            value={newproduct.price}
          />
        </div>
        <div className="mt-4">
          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-400 transition duration-200"
            onClick={handleSubmit}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
