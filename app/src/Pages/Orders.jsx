import { useEffect, useState } from "react";
import axiosInstance from "../../utlities/axiosInstance";
import { toast } from "react-toastify";

function Orders() {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
   const fetchOrder=async()=>{
    try{
      const response= await axiosInstance.get("/user/order")
      setUserOrders(response.data.data|| []);
      console.log(response.data.data)
    
    }catch (error) {
      console.error("Failed to fetch orders:", error);
    }finally {
      setLoading(false);
    }
   }
  fetchOrder()
  },[])
 
  const handleCancelOrder = async (orderId) => {
    try {
      await axiosInstance.patch(`user/order/cancel/${orderId}`);
      setUserOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, shippingStatus: "Cancelled", paymentStatus: "Cancelled", cancelled: true }
            : order
        )
      );
    
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Failed to cancel order.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading your orders...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">Orders</h2>
        {userOrders.length > 0 ? (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <div
                key={order?._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6 md:gap-12 border border-gray-200"
              >
                {/* Left Section: Order Details */}
                <div className="flex flex-col gap-4 w-full md:w-1/2">
                  <p className="font-semibold text-gray-800">Order ID: {order?._id}</p>

                  {/* Product Details */}
                  <div className="flex flex-col gap-3">
                    {order.products &&
                      order.products.length > 0 &&
                      order.products.map((item) => (
                        <div key={item.productId?._id} className="flex items-center gap-4">
                          {item.productId?.image && (
                            <img
                              src={item.productId?.image}
                              alt={item.productId?.name}
                              className="w-24 h-24 ml-14 mt-5 object-cover rounded-lg shadow-md"
                            />
                          )}
                          <div>
                            {item.productId?.name && (
                              <p className="font-medium text-gray-800">{item.productId.name}</p>
                            )}
                            {item.quantity && (
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Quantity:</span> {item.quantity}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Right Section: Order Summary */}
                <div className="flex flex-col gap-4 w-full md:w-1/2">
                  {/* Address */}
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Address:</span> {order.address.state || "Not Provided"}
                  </p>

                  {/* Shipping Status */}
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Shipping Status:</span> {order.shippingStatus || "Pending"}
                  </p>

                  {/* Payment Status */}
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Payment Status:</span> {order.paymentStatus || "Paid"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Purchased Date:</span> {order.purchasedDate || "not provided"}
                  </p>

                  {/* Total Amount */}
                  <p className="font-semibold text-gray-800 mt-2">
                    <span>Total Amount: </span>${order?.totalAmount}
                  </p>

                
{order.paymentStatus=== "Cancelled" ? (
  <button
    className="mt-4 px-4 py-2 w-52 bg-gray-400 text-white text-sm font-semibold rounded-lg shadow-md cursor-not-allowed"
    disabled
  >
    cancelled
  </button>
) : order.paymentStatus === "paid" ? (
  <button
    className="mt-4 px-4 py-2 w-52 bg-[#522815] text-white text-sm font-semibold rounded-lg shadow-md cursor-not-allowed"
    disabled
  >
    Cannot Cancel
  </button>
) : (
  <button
    className="mt-4 px-4 py-2 w-52 bg-[#522815] text-white text-sm font-semibold rounded-lg shadow-md"
    onClick={() => handleCancelOrder(order._id)}
  >
    Cancel Order
  </button>
)}

                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No Orders Found</p>
        )}
      </div>
    </div>
  );
}

export default Orders;