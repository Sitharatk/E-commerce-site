import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cancel() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleRetryPayment = () => {
    navigate('/checkout'); // Replace with the correct route for your payment page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
        <p className="text-gray-700 mb-6">
          Your payment has been cancelled. Don't worry, you can try again or choose another payment method.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleGoBack}
            className="py-2 px-6 bg-gray-500 text-white hover:bg-gray-700 transition duration-200 rounded"
          >
            Go to Home
          </button>
          <button
            onClick={handleRetryPayment}
            className="py-2 px-6 bg-[#522815]  text-white  transition duration-200 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;

