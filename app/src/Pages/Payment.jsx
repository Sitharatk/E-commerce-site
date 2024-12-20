import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import { toast } from "react-toastify";
import axiosInstance from "../../utlities/axiosInstance";

function Payment() {
  const { fetchUserCart, cartItemCalculate, userCart, setUserCart, setOrderItems } =
    useContext(cartContext);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = cartItemCalculate();

    try {
      if (paymentMethod === "Cash On Delivery") {
        await axiosInstance.post(`/user/order/cod`, { address, totalAmount });
        toast.success("Order placed successfully!");
        setOrderItems((prev) => [...prev, ...userCart]);
        setUserCart([]);
        navigate("/");
      } else if (paymentMethod === "Card") {
        const response = await axiosInstance.post(`/user/order/stripe`, {
          address,
          totalAmount,
        });
        const { stripeUrl } = response.data;
        window.location.href = stripeUrl;
      }
    } catch (error) {
      console.error(error);
    
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-11 w-128 mt-7">
        <h1 className="text-2xl font-bold text-center mb-6">PAYMENT DETAILS</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-9">
            {/* User Details */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Full Name:</label>
              <input
                type="text"
                placeholder="Enter your full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />

              <label className="mt-4 text-sm font-medium text-gray-700">Address:</label>
              <input
                type="text"
                placeholder="Enter your address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />

              <label className="mt-4 text-sm font-medium text-gray-700">Landmark:</label>
              <input
                type="text"
                placeholder="Enter landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />

              <label className="mt-4 text-sm font-medium text-gray-700">Pin Code:</label>
              <input
                type="text"
                placeholder="Enter your pin code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />

              <label className="mt-4 text-sm font-medium text-gray-700">Phone Number:</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Payment Details */}
            <div className="flex flex-col">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Payment Method:
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="Cash On Delivery"
                  checked={paymentMethod === "Cash On Delivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="cashOnDelivery" className="text-sm text-gray-700">
                  Cash On Delivery
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="Card"
                  checked={paymentMethod === "Card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="card" className="text-sm text-gray-700">
                  Card
                </label>
              </div>
              <button
                type="submit"
                className="mt-4 py-2 bg-black text-white hover:bg-gray-700 transition duration-200 rounded"
              >
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
