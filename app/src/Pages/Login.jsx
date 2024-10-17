import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
   navigate('/');
  };
 
  return (
    <>
      <div
        className="flex items-center justify-center w-full min-h-screen"
        style={{ background: 'linear-gradient(to bottom, #d1d5db, #ffffff)' }}
      >
        <div className="w-2/6 h-auto bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-4">
            <h3 className="text-3xl font-bold text-gray-800">Login</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4 mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900" >
                Password
              </label>
              <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your password"
              />
            </div>
          
            <button type="submit" className="w-full bg-gray-600 font-semibold text-l text-white py-2 rounded-md hover:bg-gray-900" >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-700">
              Don't have an account?{' '}
              <span className="text-blue-600 font-bold underline">
                <Link to="/signup"> Sign Up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;