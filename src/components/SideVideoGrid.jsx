import SideVideoCard from './SideVideoCard';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SideVideoGrid = () => {

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


  return (
    <div style={styles.grid}>
      {data.map((video) => (
         <Link key={video._id} to={`/video/${video._id}`}>
         <SideVideoCard key={video.id} video={video} />
       </Link>
      ))}
    </div>
    // 
  );
};

const styles = {
    grid: {
    width: '300px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    maxHeight: '500px', // Adjust as needed
  },
};

export default SideVideoGrid;
