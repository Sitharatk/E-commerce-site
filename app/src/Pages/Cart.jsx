import  { useContext } from 'react';
import { cartContext } from './../Context/CartContext';

import { shopContext } from './../Context/shopContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, setCartItems ,updateQuantity,patchUpdateCart} = useContext(cartContext);
  const {products}=useContext(shopContext)

const handleRemove = (itemId) => {
    setCartItems((prevItems) =>{
     const updatecart=prevItems.filter((item) => item.id !== itemId)
     patchUpdateCart(updatecart)
     return updatecart
});
    
  };


  const cartItemCalculate = () => {
    return cartItems.reduce((acc, item) => {
     return acc + item.price * item.quantity;
    }, 0);
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
            <div className="flex items-center ">
              <button onClick={()=>updateQuantity(product.id,'increment')} className="bg-gray-200 text-gray-600 px-2 py-1 text-xl font-bold rounded">+</button>
              <input type="text" className="w-12 text-center border border-gray-500" value={product.quantity} readOnly/>
              <button  onClick={()=>updateQuantity(product.id,'decrement')} className="bg-gray-200 text-gray-600 px-3 py-1 text-xl font-bold mr-8 rounded">-</button>
            </div>
            <button
              onClick={() => handleRemove(product.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 ">
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className=' flex flex-row items-center justify-between bg-white shadow-lg rounded-lg p-7 '>
        <h1 className='font-bold text-2xl text-gray-800'>Total:${cartItemCalculate()}</h1>
       <Link to='/payment'><button className='bg-black text-white px-6 py-3 rounded '>Buy Now</button></Link> 

      </div>
    </div>
  );
}

export default Cart;

