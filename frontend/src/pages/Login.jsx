import React, { useState, useContext } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar, Loader } from "../import-export/ImportExport";
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
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
    try{
      setLoader(true);
      const response = await axios.post("http://localhost:5500/user/login", formData);
      const { token, user } = response.data; 
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setLoader(false);
      navigate("/");
    } catch(error){
      setLoader(false);
      if (error.response && error.response.data && error.response.data.msg === "Invalid credentials") {
        toast.warning("Invalid Credentials!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        console.log("An error occurred:", error);
      }
    }
    
  };
  if(loader){
    return (
      <Loader />
    );
  }
  
  return (
    <>
    <Navbar />
    <div className="mt-10 flex justify-center items-center">
    <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="bg-secondary hover:bg-primary text-white py-3 px-6 rounded w-full mb-4">Login</button>
        </form>
        <p className="text-center">Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</a></p>
      </div>
    </div>
    </>
  );
};

export default Login;
