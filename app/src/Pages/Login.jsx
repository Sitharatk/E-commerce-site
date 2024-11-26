import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setCurrentUser}=useContext(UserContext)
  const [users,setUsers]=useState([])

  useEffect(()=>{
    axios.get("http://localhost:4000/users")
    .then((response)=>setUsers(response.data))
    .catch((error)=>console.log(error))
  },[])


const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  const foundUser = users.find(user => user.email === email && user.password === password);
const foundBlock=users.find(user => user.email === email && user.password === password&&user.isBlock==true);

if (foundBlock) {
    toast.error("User is Blocked");
} else if (foundUser) {
  setCurrentUser(foundUser);
  navigate('/');
} else {
  toast.error("User not found");
}
};

 
  return (
    <>
      <div className="flex items-center justify-center min-h-96"
        style={{ background: 'linear-gradient(to bottom, #d1d5db, #ffffff)' }}>
        <div className="w-2/6 h-auto bg-white mt-40  mb-24 rounded-lg shadow-lg p-6">
          <div className="text-center mb-4">
            <h3 className="text-3xl font-bold text-gray-800">Login</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-4">
              
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                placeholder="Email"
              />
            </div>
            <div className="mb-4 mt-4">
              
              <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                placeholder="Password"
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