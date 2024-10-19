import { useContext, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import { toast } from 'react-toastify';
    

function Payment() {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate =useNavigate()

 const {setCartItems,patchUpdateCart,setOrderItems,cartItems}=useContext(cartContext)
const handleSubmit = (e) => {
    e.preventDefault();
   toast("Payment Successful");
 
   placeOrder()
   navigate('/')
  };


  const placeOrder = async () => {
    setOrderItems((prev)=> [...prev, cartItems])
    await patchUpdateCart([]); 
    setCartItems([]);
    
  };
  

  return (
    <div className="flex items-center justify-center bg-gray-100 ">
      <div className="bg-white shadow-lg rounded-lg p-11 w-128 mt-7 ">
        <h1 className="text-2xl font-bold text-center mb-6">PAYMENT DETAILS</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-9">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Full Name:</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />

              <label className="mt-4 text-sm font-medium text-gray-700">Address:</label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />

              <label className="mt-4 text-sm font-medium text-gray-700">Landmark:</label>
              <input
                type="text"
                id="landmark"
                placeholder="Enter landmark"
                required
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />

              <label className="mt-4 text-sm font-medium text-gray-700">Pin Code:</label>
              <input
                type="text"
                id="pinCode"
                placeholder="Enter your pin code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />

              <label className="mt-4 text-sm font-medium text-gray-700">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="Enter your phone number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Payment Method:</label>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="cashOnDelivery"
                    name="paymentMethod"
                    className="mr-2"
                    value="Cash On Delivery"
                    
                    required
                  />
                  <label htmlFor="cashOnDelivery" className="text-sm text-gray-700">Cash On Delivery</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="upi"
                    name="paymentMethod"
                    className="mr-2"
                    value="UPI"
                    
                    required
                  />
                  <label htmlFor="upi" className="text-sm text-gray-700">UPI</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="netBanking"
                    name="paymentMethod"
                    className="mr-2"
                    value="Net Banking"
                    
                    required
                  />
                  <label htmlFor="netBanking" className="text-sm text-gray-700">Net Banking</label>
                </div>
              </div>
               
              
              <button  type="submit" className="mt-4 py-2 bg-black text-white hover:bg-gray-700 transition duration-200">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
