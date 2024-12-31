import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Channel from "./Channel";

const UserProfile = () => {
  const username = localStorage.getItem("username");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/form"); // Redirect to login page if not logged in
    }
  }, [username, navigate]);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };



  const handleLogout = () => {
    localStorage.clear();
    navigate("/form");
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

      <div className="bg-white text-black text-right mr-12">
       
          <div className=" mb-6">
            <h1 className="text-2xl font-semibold">{username}</h1>
          </div>
          {/* Logout button */}
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
            >
              Logout
            </button>
          </div>
      
      </div>


      <Channel />

    </>


  );
};

export default UserProfile;
