import { useEffect, useState } from "react";
import axiosInstance from "../../../utlities/axiosInstance";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/admin/orders");
      setOrders(response.data.data || []);
    } catch (error) {
      setError("Failed to fetch orders.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateShippingStatus = async (orderId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "Processing"
          ? "Shipped"
          : currentStatus === "Shipped"
          ? "Delivered"
          : "Delivered";
    
      // Optimistic update: Immediately update the UI state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, shippingStatus: newStatus }
            : order
        )
      );
    
      // Send the status update to the backend
      await axiosInstance.patch(`/admin/update/shipping/${orderId}`, {
        status: newStatus,
      });
  
      // Optionally, re-fetch orders if needed (or leave it if state is enough)
      fetchOrders();
    } catch (error) {
      // Log the error response
      console.error("Error updating shipping status:", error.response?.data || error.message);
      setError("Failed to update shipping status.");
    }
  };
  
  const handleUpdatePaymentStatus = async (orderId) => {
    try {
      const newStatus = "paid";
  
      // Send the updated status to the backend
      await axiosInstance.patch(`/admin/update/payment/${orderId}`, {
        paymentStatus: newStatus,
      });
  
      // Update the state locally
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, paymentStatus: newStatus }
            : order
        )
      );
    } catch (error) {
      setError("Failed to update payment status.");
      console.error("Error updating payment status:", error);
    }
  };
  

  if (loading) {
    return <p className="text-center text-gray-500">Loading all orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start ml-64">
      <div className="bg-gray-200 shadow-lg rounded-lg p-6 w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">Orders</h2>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6 md:gap-12 border border-gray-200"
              >
                <div className="flex flex-col gap-4 w-full md:w-1/2">
                  <p className="font-semibold text-gray-800">
                    Order ID: {order._id}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">UserId:</span>{" "}
                    {order.userId || "Unknown"}
                  </p>
                  <div className="flex flex-col gap-3">
                    {order.products?.map((item) => (
                      <div
                        key={item.productId?._id}
                        className="flex items-center gap-4"
                      >
                        {item.productId?.image && (
                          <img
                            src={item.productId?.image}
                            alt={item.productId?.name}
                            className="w-24 h-24 object-cover rounded-lg shadow-md"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.productId?.name || "Product Name"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Quantity:</span>{" "}
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-1/2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Address:</span>{" "}
                    {order.address || "Not Provided"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Shipping Status:</span>{" "}
                    {order.shippingStatus || "Processing"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Payment Status:</span>{" "}
                    {order.paymentStatus || "Pending"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Payment Method:</span>{" "}
                    {order.paymentMethod || "Pending"}
                  </p>
                  <p className="font-semibold text-gray-800">
                    <span>Total Amount: </span>${order.totalAmount}
                  </p>
                  <div className="mt-2 flex gap-4">
                    {/* Shipping Button */}
                    {order.shippingStatus !== "Delivered" && (
                      <button
                        className="px-4 py-2 bg-[#522815] text-white text-sm font-semibold rounded-lg shadow-md"
                        onClick={() =>
                          handleUpdateShippingStatus(
                            order._id,
                            order.shippingStatus
                          )
                        }
                      >
                        {order.shippingStatus === "Processing"
                          ? "Mark as Shipped"
                          : "Mark as Delivered"}
                      </button>
                    )}
                    {order.shippingStatus === "Delivered" && (
                      <button
                        className="px-4 py-2 bg-gray-400 text-white text-sm font-semibold rounded-lg shadow-md"
                        disabled
                      >
                        Delivered
                      </button>
                    )}

                    {/* Payment Button */}
                    {order.paymentMethod === "cash on delivery" &&
                    order.paymentStatus !== "paid" ? (
                      <button
                        className="px-4 py-2 bg-[#522815] text-white text-sm font-semibold rounded-lg shadow-md"
                        onClick={() =>
                          handleUpdatePaymentStatus(order._id)
                        }
                      >
                        Mark as Paid
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 bg-gray-400 text-white text-sm font-semibold rounded-lg shadow-md"
                        disabled
                      >
                        Paid
                      </button>
                    )}
                  </div>
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

export default OrderManagement;
