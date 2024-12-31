import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ username: "", email: "", password: "" });
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister ? "http://localhost:5100/api/register" : "http://localhost:5100/api/login";

    try {
      const response = await axios.post(url, formData);
      setMessage(response.data.message);

      if (!isRegister && response.data.token) {
        // Store user data in localStorage after successful login
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", formData.username);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("profilePic", response.data.profilePic || ""); // Store the profile picture URL
        

        // Redirect to homepage after successful login
        navigate("/"); // Redirect to homepage
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>


  <div className="sticky top-0 bg-white z-50">
        <Header toggleSidebar={handleToggle} />
      </div>

      <div
        className="sidebar-container"
        style={{
          display: isCollapsed ? "block" : "none",
          position: "fixed",
          left: 0,
          width: "220px",
          height: "100vh",
          backgroundColor: "white",
          transition: "transform 0.3s ease",
          overflowY: "auto",
          zIndex: 1000,
        }}
      >
        <Sidebar />
      </div>  
  
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Register" : "Login"}
        </h1>
        {message && (
          <p className="text-center text-sm text-red-500 mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:ring-2 focus:ring-red-500"
            />
          </div>

          {isRegister && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:ring-2 focus:ring-red-500"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={toggleForm} className="text-red-500 hover:underline">
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
    </>
  );
};

export default Form;
