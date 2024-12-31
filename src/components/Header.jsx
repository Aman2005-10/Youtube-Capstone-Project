import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import youtubelogo from "../assets/youtubelogo.png";
import bellpng from "../assets/bell.png";
import pluslogo from "../assets/plus.png";
import searchlogo from "../assets/search.png";

const Header = ({ toggleSidebar, onSearch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstletter, setFirstletter] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const user = localStorage.getItem("username"); // Check for user info in localStorage
    if (!user) {
      setIsLoggedIn(false);
      setFirstletter("");
    } else {
      setIsLoggedIn(true);
      setFirstletter(user.charAt(0).toUpperCase());
    }
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
    onSearch(e.target.value); // Pass the search term to parent component (Homepage)
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-2 sm:px-4 py-2 bg-white shadow-md">
      {/* Hamburger Menu and Logo */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button onClick={toggleSidebar} className="text-xl text-black sm:text-2xl">
          ☰
        </button>
        <div className="flex items-center space-x-1">
          <Link to={"/"}>
          
       <img src={youtubelogo} alt="YouTube Logo" className="h-4  sm:h-6 sm:w-12 md:h-8" />
       </Link>
</div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center flex-grow max-w-xs sm:max-w-md ml-4">
  <input
    type="text"
    value={searchTerm}
    onChange={handleSearchInputChange}
    placeholder="Search"
    className="flex-grow px-2 py-1 text-xs sm:text-sm md:text-base rounded-l-full border border-gray-300 text-black focus:outline-none"
  />
  <button className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-r-full">
    <img
      src={searchlogo}
      alt="Search"
      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
      style={{
        padding: "3px",
        borderRadius: "50%",
      }}
    />
  </button>
</div>


      {/* Profile and Notifications */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="text-lg text-black">
          <Link to={'/userprofile'}>
            <img src={pluslogo} width={18} alt="Plus" className="sm:w-5 w-4" />
          </Link>
        </button>
       
        <button className="text-lg text-black">
          <img src={bellpng} width={18} alt="Notifications" className="sm:w-5 w-4" />
        </button>

        {/* Conditional Link to Profile or Form */}
        <Link to={isLoggedIn ? "/userprofile" : "/form"}>
          {isLoggedIn ? (
            <span
              className="text-red-600 font-medium border-2 border-red-600 rounded-full flex items-center justify-center w-10 h-10 bg-red-100"
            >
              {firstletter}
            </span>
          ) : (
            <span className="text-blue-800 text-sm sm:text-base">Sign Up</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
