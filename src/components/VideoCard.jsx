import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer hover:shadow-xl">
    <img
      src={video.thumbnailUrl}
      alt={video.title}
      className="w-full h-40 object-cover"
    />
    <div className="p-4 space-y-2">
      <h3 className="font-bold text-lg text-gray-800 truncate">{video.title}</h3>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p className="font-medium">{video.channelName}</p>
        <p>{video.views} views</p>
      </div>
    </div>
  </div>
  
  );
};

export default VideoCard;
