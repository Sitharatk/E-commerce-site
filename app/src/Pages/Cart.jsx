import { useContext } from 'react';
import { cartContext } from './../Context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, setCartItems, updateQuantity, patchUpdateCart } = useContext(cartContext);

  const handleRemove = (itemId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== itemId);
      patchUpdateCart(updatedCart);
      return updatedCart;
    });
  };

  const cartItemCalculate = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Your cart is empty!</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-5">Cart</h2>
      <div className="grid grid-cols-1 gap-6">
        {cartItems.map((product) => (
          <div
            key={product.id}
            className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg p-4 items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <div className="w-full sm:w-40 h-40 flex-shrink-0">
              <img
                src={product.imageUrl || product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex-grow">
              <p className="font-bold text-lg sm:text-xl text-gray-800">{product.name}</p>
              <p className="text-base sm:text-lg text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
              <div className="flex items-center mt-14">
                <button
                  onClick={() => updateQuantity(product.id, 'decrement')}
                  className="bg-white text-gray-600 px-3 py-1 text-2xl font-bold rounded"
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-12 text-center border border-gray-500 rounded"
                  value={product.quantity}
                  readOnly
                />
                <button
                  onClick={() => updateQuantity(product.id, 'increment')}
                  className="bg-white text-gray-600 px-3 py-1 text-2xl font-bold rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center  sm:space-x-2 space-y-2 sm:space-y-0">
            
              <div className='mt-14'>
              <button
                onClick={() => handleRemove(product.id)}
                className="bg-black text-white px-3 py-1  rounded hover:bg-amber-950 transition duration-300"
              >
                Remove
              </button>
              </div>
            </div>
          </div>
        ))}
      </div> 
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-4 sm:p-7 mt-5">
        <h1 className="font-bold text-xl sm:text-2xl text-gray-800">
          Total: ${cartItemCalculate()}
        </h1>
        <Link to="/payment">
          <button className="mt-3 sm:mt-0 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition duration-300">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
