import React, { useContext } from 'react';
import { cartContext } from './../Context/CartContext';

function Cart() {
  const { cartItems, setCartItems } = useContext(cartContext);


  const handleRemove = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Your cart is empty!</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-5">Cart</h2>
      <div className="grid grid-cols-1 gap-6">
        {cartItems.map((product) => (
          <div key={product.id} className="flex flex-row items-center justify-between bg-white shadow-lg rounded-lg p-4">
            <div className="w-32 h-32">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-sm" />
            </div>
            <div className="flex-grow pl-4">
              <p className="font-bold text-xl text-gray-800">{product.name}</p>
              <p className="text-lg text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
            <button
              onClick={() => handleRemove(product.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;

