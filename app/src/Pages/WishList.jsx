import  { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../Context/WishlistContext';


function Wishlist() {

      const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  return (
    <div className="p-6">
          <h2 className="text-2xl font-bold text-[#522815] font-serif mb-4">Wishlist</h2>
          {wishlistItems.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              Your wishlist is empty. Browse our <Link to="/" className="text-amber-800 hover:underline">products</Link>.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {wishlistItems.map((product,index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`/product/${product._id}`} className="no-underline">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
    
                  </Link>
                  <div className="p-3">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg text-gray-800">{product.name}</p>
                      <button
                        onClick={() => removeFromWishlist(product._id)}
                        className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-amber-950 transition duration-300"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

export default Wishlist