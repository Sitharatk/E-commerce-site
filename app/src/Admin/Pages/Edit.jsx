import  { useContext, useState ,useEffect} from 'react';
import { shopContext } from '../../Context/shopContext';
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from './../../../utlities/axiosInstance';


function Edit() {
    const {id} =useParams()
    const {products}=useContext(shopContext)
    const [product, setProduct] = useState(null);
    const [name,setName]=useState('')
    const [image,setImage]=useState('')
    const [description,setDescritption]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('')
    const navigate = useNavigate()
       
    useEffect(() => {
        console.log("ID from useParams:", id);
    }, [id]);
    
    // eslint-disable-next-line no-undef
    useEffect(() => {
        if (products) {
    const getproduct = products.find((item) => item._id === id);
    setProduct(getproduct)
            if(getproduct){
                setName(getproduct.name);
            setImage(getproduct.image);
            setDescritption(getproduct.description);
            setPrice(getproduct.price);
            setCategory(getproduct.category)
            }
            
        }
    }, [id,products]);
    const handleSave = async () => {
        if (product) {
            try {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("description", description);
                formData.append("price", parseFloat(price));
                formData.append("category",category)
                if (image) {
                    formData.append("image", image);
                };
                const response=await axiosInstance.patch(`/admin/products/${id}`, formData);
                const updatedProduct = response.data;
                setProduct((prevProducts) => 
                    prevProducts.map((item) => (item._id === product._id ? updatedProduct : item))
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

    const handleRemoveOrrestore = async () => {
        try {
            const updatedProduct = { ...product, isDelete: !product.isDelete };
            await axiosInstance.patch(`/admin/products/delete/${id}`, { isDelete: updatedProduct.isDelete });
    
            // Assuming you have a method to update the products in your context
            setProduct((prevProducts) =>
                prevProducts.map((item) =>
                    item._id === product._id ? { ...item, isDelete: updatedProduct.isDelete } : item
                )
            );
    
            navigate('/productmanagment');
        } catch (error) {
            console.error('Error deleting/restoring the product:', error);
        }
    };
    
 const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImage(file);
        console.log("Selected file:", file.name); 
    }
};

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
            <label className="block text-lg font-semibold mb-1">Image :</label>
            <input
               
                type="file" accept="image/*"
               onChange={handleImageChange} className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <label className="block text-lg font-semibold mb-1">Description:</label>
            <input
                type="text"
                value={description} onChange={(e) => setDescritption(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded mb-4"
            />
             <label className="block text-lg font-semibold mb-1">Category:</label>
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border border-gray-300 p-2 w-full rounded mb-4"
>
  <option value="" disabled>
    Select a category
  </option>
  <option value="women">Women</option>
  <option value="men">Men</option>
  <option value="sunglasses">Sunglasses</option>
</select>

            <label className="block text-lg font-semibold mb-1">Price:</label>
            <input
                type="number"
                value={price} onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded mb-4"
            />
            <div className="flex gap-4 mt-4 ml-96 ">
            <button  onClick={handleSave}className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Save</button>
            <button onClick={handleRemoveOrrestore}   className={`${
                                product && product.isDelete
                                    ? "bg-green-500  px-4 py-2 rounded hover:bg-green-600"
                                    : "bg-red-500  px-4 py-2 rounded hover:bg-red-600"
            }`}>
           {product && product.isDelete ? "Restore Product" : "Delete Product"}</button>
            </div>
        </div>
    </div>
</div>
);
}

export default Edit