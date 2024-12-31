import React, { useState } from "react";
import axios from "axios";

const Test = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const toggleForm = () => {
    setFormVisible(!formVisible);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoData({ ...videoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Check token existence
      if (!token) {
        setErrorMessage("Authentication token is missing.");
        return;
      }
      const url = "http://localhost:5100/api/createVideo";
      const response = await axios.post(url, videoData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("Video uploaded successfully!");
      setVideoData({
        title: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: "",
      });
      toggleForm();
    } catch (error) {
      console.error("Error uploading video:", error);
      setErrorMessage(error.response?.data?.error || error.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <button
        onClick={toggleForm}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {formVisible ? "Cancel Upload" : "Upload Video"}
      </button>

      {formVisible && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 p-4 border rounded shadow-md bg-gray-50"
        >
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={videoData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Description</label>
            <textarea
              name="description"
              value={videoData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Video URL</label>
            <input
              type="url"
              name="videoUrl"
              value={videoData.videoUrl}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnailUrl"
              value={videoData.thumbnailUrl}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          {errorMessage && (
            <p className="mt-2 text-red-500">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-2 text-green-500">{successMessage}</p>
          )}
        </form>
      )}
    </div>
  );
};

export default Test;
