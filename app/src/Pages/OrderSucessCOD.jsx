import { useNavigate} from 'react-router-dom';

function OrderSucessCOD() {
 const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        <h1 className="text-2xl font-bold text-[#522815]  mb-4">Order Successful!</h1>
        
        <p className="text-gray-700 mb-6">
        Thank you for your purchase! Your order has been successfully processed and is on its way to you
        </p>
        <button
          onClick={handleGoToHome}
          className="mt-4 py-2 px-6 bg-[#522815] text-white  hover:bg-[#ad755b] transition duration-200 rounded"
        >
          Go to Home
        </button>
      </div>
    </div>
  )
}

export default OrderSucessCOD