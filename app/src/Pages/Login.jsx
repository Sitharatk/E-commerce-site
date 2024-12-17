import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const { loginUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full"
      style={{
        background:
          'url(https://i.pinimg.com/736x/88/ed/5e/88ed5e9a13cdce632516e620fc400e23.jpg) no-repeat center center fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="w-full sm:w-5/6 md:w-2/3 lg:w-2/6 bg-white rounded-lg shadow-lg p-6 sm:p-8"
        style={{
          background:
            'url(https://static.vecteezy.com/system/resources/thumbnails/017/301/346/small/soft-orange-brown-watercolor-background-color-splashing-watercolor-abstract-wet-hand-drawn-for-wallpaper-card-greeting-poster-design-cover-invitation-illustration-free-vector.jpg) center',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#522815] font-cinzel">Login</h3>
        </div>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Email"
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'} 
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Password"
            />
        
<span
  onClick={() => setShowPassword(!showPassword)}
  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
>
  {showPassword ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5c-7.5 0-9.75 7.5-9.75 7.5s2.25 7.5 9.75 7.5 9.75-7.5 9.75-7.5-2.25-7.5-9.75-7.5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15.75A3.75 3.75 0 1012 8.25a3.75 3.75 0 000 7.5z"
      />
    </svg>
  ) : (

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.53a10.724 10.724 0 0116.04 0M2.25 2.25l19.5 19.5m-1.5-6a10.73 10.73 0 01-15.01 0m3.97-3.98a3.75 3.75 0 115.31 5.31"
      />
    </svg>
  )}
</span>

          </div>

          <button
            type="submit"
            className="w-full bg-[#7c3d20] text-white font-semibold py-2 rounded-md hover:bg-[#c48c70]"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-700">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#522815] font-bold underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
