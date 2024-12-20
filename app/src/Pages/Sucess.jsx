import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utlities/axiosInstance';

function Success() {
    const navigate = useNavigate();
  const { sessionId } = useParams();
  const [status, setStatus] = useState({ loading: true, success: false, message: "" });

  useEffect(()=>{

    const fetchorders=async()=>{
        try{
            const response = await axiosInstance.put(
            `/user/order/stripe/success/${sessionId}`,
            {},
          );
          console.log("API Response:", response.data);
          setStatus({ loading: false, success: true, message: response.data.message });

        }catch (error) {
          console.error("Error fetching order status:", error);
          setStatus({
            loading: false,
            success: false,
            message: error.response?.data?.message || "Something went wrong.",
          });

    }
}

if (sessionId) {
    fetchorders();
  }
  },[sessionId]) 


  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        <h1 className="text-2xl font-bold text-[#522815]  mb-4">Payment Successful!</h1>
        <p className="text-gray-700">{status.message}</p>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase! Your payment has been successfully processed.
        </p>
        <button
          onClick={handleGoToHome}
          className="mt-4 py-2 px-6 text-[#522815]  text-white hover:bg-gray-700 transition duration-200 rounded"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default Success;
