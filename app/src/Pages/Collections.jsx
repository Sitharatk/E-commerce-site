import { useContext, useEffect, useState } from 'react';
import { shopContext } from './../Context/shopContext';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { WishlistContext } from './../Context/WishlistContext';

function Collections() {
  const { products } = useContext(shopContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of products per page

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get products for the current page
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Scroll to top of the page on page change
  useEffect(() => {
    window.scrollTo({ top: 80, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some((item) => item._id === product._id);
    if (isInWishlist) {
      removeFromWishlist(product._id); // Remove from wishlist
    } else {
      addToWishlist(product._id); // Add to wishlist
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center my-5">
        <p className="font-bold text-3xl text-[#31180d] border-b-2 font-serif border-gray-300 pb-2">
          COLLECTIONS
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transition-transform duration-300 hover:scale-105 relative"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-2"
              />
              <p className="font-semibold ml-3 text-lg">{product.name}</p>
              <p className="text-sm ml-3 text-gray-600">
                ${product.price}
              </p>
            </Link>
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute bottom-7 right-7 text-2xl text-gray-500 hover:text-[#31180d] transition"
            >
              {wishlistItems.some((item) => item._id === product._id) ? (
                <FaHeart className="text-[#31180d]" />
              ) : (
                <FaRegHeart />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 mb-10">
        <nav className="inline-flex shadow rounded-lg">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border text-sm font-medium ${
                currentPage === index + 1
                  ? 'bg-[#31180d] text-white'
                  : 'bg-white text-[#31180d]'
              } hover:bg-[#31180d] hover:text-white transition`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Collections;
