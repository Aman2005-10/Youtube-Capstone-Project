import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";

const VideoGrid = ({ searchQuery, selectedFilter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const url = "http://localhost:5100/api/getVideos";
    const token = localStorage.getItem("token");

    if (!token) return console.error("Token not found in localStorage");

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Failed to fetch videos:", response.status);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Filter videos by title and selected filter
  const filteredVideos = data.filter((video) =>
    (selectedFilter === "All" || video.title.toLowerCase().includes(selectedFilter.toLowerCase())) &&
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {filteredVideos.map((video) => (
        <Link key={video._id} to={`/video/${video._id}`}>
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoGrid;
