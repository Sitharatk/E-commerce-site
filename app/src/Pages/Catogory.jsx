import { useContext } from 'react';
import { shopContext } from './../Context/shopContext';
import { Link, useParams } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { WishlistContext } from './../Context/WishlistContext';

function Category() {
  const { products } = useContext(shopContext);
  const { category } = useParams();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const filteredProducts = products.filter((product) => product.category === category);

  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some((item) => item._id === product._id);
    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id); 
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center my-5">
        <p className="font-bold text-3xl text-[#31180d] border-b-2 border-gray-300 pb-2">
          {category.toUpperCase()} COLLECTIONS
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden p-4 transition-transform duration-300 hover:scale-105"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-2"
              />
              <p className="font-semibold ml-4 text-lg">{product.name}</p>
              <p className="text-sm ml-4 text-gray-600">${product.price}</p>
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
    </div>
  );
}

export default Category;
