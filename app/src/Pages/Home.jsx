import { useContext } from 'react';
import womenImage from '../assets/womenImage.jpg';
import menImage from '../assets/menImage.jpg';
import sunglasses from '../assets/sunglasses.jpg';
import { shopContext } from './../Context/shopContext';
import { WishlistContext } from './../Context/WishlistContext';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

function Home() {
  const { products } = useContext(shopContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

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
      {/* Hero Section */}
      <div className="sm:relative sm:h-96">
        <img
          src="https://i.pinimg.com/736x/4c/5a/55/4c5a550810ca01a7e271870b862b1549.jpg"
          alt="Lady"
          className="sm:w-full h-[500px] object-cover"
        />
        <Link to="/collections">
          <button className="absolute sm:top-44 font-engagement left-48 top-72 sm:left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#522815] text-white px-6 py-2 rounded-full hover:bg-[#9b6d58] transition duration-300">
            SHOP NOW
          </button>
        </Link>
      </div>

      {/* Categories */}
      <div className="p-4 sm:p-7 mt-32">
        <p className="font-bold text-2xl text-center sm:text-left text-[#522815] font-serif">CATEGORIES</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-20 mb-3 mt-6 px-4">
        {/* Men */}
        <div className="text-center bg-[#e9ddd8] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
          <Link to="/catogory/men">
            <img
              src={menImage}
              alt="MEN"
              className="w-40 h-52 sm:w-64 sm:h-80 rounded-md transition-transform duration-300 hover:scale-110 mb-4"
            />
          </Link>
          <Link to="/catogory/men">
            <button className="mt-2 bg-[#6d4431] font-semibold text-white text-sm px-4 py-2 rounded-full hover:bg-[#9b6d58] transition duration-300">
              Explore MEN
            </button>
          </Link>
        </div>

        {/* Women */}
        <div className="text-center bg-[#e9ddd8] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
          <Link to="/catogory/women">
            <img
              src={womenImage}
              alt="WOMEN"
              className="w-40 h-52 sm:w-64 sm:h-80 rounded-md mb-4 transition-transform duration-300 hover:scale-110"
            />
          </Link>
          <Link to="/catogory/women">
            <button className="mt-2 bg-[#70432e] font-semibold text-white text-sm px-4 py-2 rounded-full hover:bg-[#9b6d58] transition duration-300">
              Explore WOMEN
            </button>
          </Link>
        </div>

        {/* Sunglasses */}
        <div className="text-center bg-[#e9ddd8] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
          <Link to="/catogory/sunglasses">
            <img
              src={sunglasses}
              alt="SUNGLASSES"
              className="w-40 h-52 sm:w-64 sm:h-80 mb-4 rounded-md transition-transform duration-300 hover:scale-110"
            />
          </Link>
          <Link to="/catogory/sunglasses">
            <button className="mt-2 bg-[#70432e] font-semibold text-white text-sm px-4 py-2 rounded-full hover:bg-[#9b6d58] transition duration-300">
              Explore SUNGLASSES
            </button>
          </Link>
        </div>
      </div>

      {/* New Arrivals */}
      <div>
        <div className="px-7">
          <p className="font-bold text-2xl text-center sm:text-left text-[#522815] font-serif mt-20">
            NEW ARRIVALS
          </p>
        </div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter((product) => product.arrival === 'new')
            .map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transition-transform duration-300 hover:scale-105 relative"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 sm:h-48 object-cover rounded-t-lg"
                  />
                  <div className="ml-4 mt-2">
                    <p className="font-semibold text-base sm:text-lg text-[#31180d]">
                      {product.name}
                    </p>
                    <p className="text-sm sm:text-base text-[#31180d]">${product.price}</p>
                  </div>
                </Link>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute bottom-5 right-7 text-2xl text-gray-500 hover:text-[#31180d] transition"
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
    </div>
  );
}

export default Home;
