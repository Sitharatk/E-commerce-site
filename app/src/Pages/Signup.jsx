import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
  
      console.log('Form submitted', formData);
      navigate('/login'); 
    }
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
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your username" required/>
            {errors.username && <span className="text-red-600">{errors.username}</span>}
          </div>

          <div className="mb-4 mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="email">
              Email
            </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email" required
            />
            {errors.email && <span className="text-red-600">{errors.email}</span>}
          </div>

          <div className="mb-4 mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="password">
              Password
            </label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your password" required
            />
            {errors.password && <span className="text-red-600">{errors.password}</span>}
          </div>

          <div className="mb-4 mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Confirm your password" required
            />
            {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword}</span>}
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