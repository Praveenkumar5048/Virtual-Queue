import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from "react-router";
import { Navbar } from "../import-export/ImportExport";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone:'',
    password: '',
    showPassword: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData(prevState => ({
      ...prevState,
      showPassword: !prevState.showPassword
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5500/user/register', formData);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl text-center mb-8">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <span className="p-3 border-r border-gray-300">
              <FaUser className="h-6 w-6" />
            </span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="py-3 px-4 flex-1 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <span className="p-3 border-r border-gray-300">
              <FaEnvelope className="h-6 w-6" />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="py-3 px-4 flex-1 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <span className="p-3 border-r border-gray-300">
              <FaPhone className="h-6 w-6" />
            </span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="py-3 px-4 flex-1 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 flex items-center border border-gray-300 rounded">
            <span className="p-3 border-r border-gray-300">
              <FaLock className="h-6 w-6" />
            </span>
            <input
              type={formData.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="py-3 px-4 flex-1 focus:outline-none"
              required
            />
            <span className="p-3 cursor-pointer" onClick={togglePasswordVisibility}>
              {formData.showPassword ? <FaEyeSlash className="h-6 w-6" /> : <FaEye className="h-6 w-6" />}
            </span>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded w-full mb-4">Sign Up</button>
        </form>
        <p className="text-center">Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a></p>
      </div>
    </div>
    </>
  );
};

export default SignUp;
