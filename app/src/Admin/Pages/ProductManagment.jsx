import { useContext, useState } from 'react';
import { shopContext } from '../../Context/shopContext';
import { Link } from 'react-router-dom';

function ProductManagement() {
  const { products } = useContext(shopContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get current page data
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between ml-64">
        <h1 className="text-2xl font-bold">PRODUCTS</h1>
        <Link to="/addproduct">
          <button className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-slate-400 transition duration-200">
            Add Product
          </button>
        </Link>
      </div>
      <div className="ml-64">
        <table className="w-full border border-gray-300">
          <thead className="border-2 border-gray-300">
            <tr>
              <th className="border-2 border-gray-300 p-3 text-center">ID</th>
              <th className="border-2 border-gray-300 p-3 text-center">Image</th>
              <th className="border-2 border-gray-300 p-3 text-center">Name</th>
              <th className="border-2 border-gray-300 p-3 text-center">Price</th>
              <th className="border-2 border-gray-300 p-3 text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td className="border border-gray-300 text-center">
                  {product._id}
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  {product.name}
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  ${product.price}
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  <Link to={`/edit/${product?._id}`}>
                    <button className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-black transition duration-200">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? 'bg-black text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
