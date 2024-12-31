import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoGrid from "../components/VideoGrid";
import FilterBar from "../components/FilterBar";
import SidebarCollapse from "./SidebarClopse";

function Homepage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All"); // New state for selected filter

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query); 
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter); // Update the selected filter
  };

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={handleToggle} onSearch={handleSearchChange} />

      <div className="flex flex-1 overflow-hidden">
        <div
          className="sidebar-container"
          style={{
            width: isCollapsed ? "60px" : "220px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            height: "auto",
            overflowY: isCollapsed ? "hidden" : "auto",
            scrollbarWidth: "thin",
            transition: "width 0.3s ease",
          }}
        >
          {isCollapsed ? <SidebarCollapse /> : <Sidebar />}
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <FilterBar onFilterChange={handleFilterChange} /> {/* Pass filter change handler */}

          {isLoggedIn ? (
            <div className="flex-1 overflow-y-auto p-4">
              <VideoGrid searchQuery={searchQuery} selectedFilter={selectedFilter} /> {/* Pass selectedFilter */}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6">
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Try searching to get started
                </h2>
                <p className="text-gray-600">
                  Start watching videos to help us build a feed of videos you'll love.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
