import { Link, useNavigate } from 'react-router-dom';
import  { useEffect, useState } from 'react';
import axios from 'axios';

function Registration() {
  const [Data, setData] = useState({
    username: '',
    email: '',
    password: '',
    cart: [],
    order: []
  });
  const [cPassword,setcPassword]=useState('')
const [user,setUser]=useState([])
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get("http://localhost:5000/users")
    .then((response)=>{
      setUser(response.data)
      if(user.some(item=>item.email!==Data.email)){
        if(Data.password==cPassword){
          axios.post("http://localhost:5000/users",Data)
          .then(()=>{
            alert("posted")
            navigate('/login')
          })
          .catch((err)=>console.log(err)
          )
        }else{
          alert("password dont match")
        }
      }else{
        alert("user already exist")
      }
    })
    .catch((error)=>console.log(error))
   
  };
  
  return (
    <div
      className="flex items-center justify-center w-full min-h-screen"
      style={{ background: 'linear-gradient(to bottom, #d1d5db, #ffffff)' }}
    >
      <div className="w-2/6 h-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-4">
          <h3 className="text-3xl font-bold text-gray-800">SignUp</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="username">
              Username
            </label>
            <input type="text" id="username" name="username" value={Data.username} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your username" required/>
    
          </div>

          <div className="mb-4 mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="email">
              Email
            </label>
            <input type="email" id="email" name="email" value={Data.email} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email" required
            />
         
          </div>

          <div className="mb-4 mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="password">
              Password
            </label>
            <input type="password" id="password" name="password" value={Data.password} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your password" required
            />

          </div>

          <div className="mb-4 mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input type="password" id="confirm-password" name="confirmPassword" value={cPassword} onChange={(e)=>setcPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Confirm your password" required
            />

          </div>

          <button type="submit" className="w-full bg-gray-600 font-semibold text-l text-white py-2 rounded-md hover:bg-gray-900">
            Signup
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;