import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function VideoTest() {
  const { id } = useParams(); // Get the video ID from the URL params
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const foundVideo = data.find((video) => video.id === id); // Find video by ID
        setVideo(foundVideo);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
        setLoading(false);
      });
  }, [id]); // Re-fetch video when the ID changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div>
      <h1>{video.title}</h1>
      <video width="100%" controls>
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{video.description}</p>
    </div>
  );
}

export default VideoTest;
