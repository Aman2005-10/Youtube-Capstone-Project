import { useState, useEffect } from "react";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function ChannelView() {
    const { id } = useParams(); // Channel ID from URL params
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [channelData, setChannelData] = useState(null); // State to hold channel data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [bannerImage, setBannerImage] = useState(localStorage.getItem(`channelBanner_${id}`) || '');
    const [profileImage, setProfileImage] = useState(localStorage.getItem(`channelProfile_${id}`) || '');
    const [isModalOpen, setIsModalOpen] = useState(false); // Video upload modal visibility
    const [videos, setVideos] = useState([]);
    const [videoData, setVideoData] = useState({
        title: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    useEffect(() => {
        fetchChannelById();
        handledelete();
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchVideosByChannel(id); // Fetch videos for the specific channel
        }
    }, [id]);

    const fetchChannelById = async () => {
        const url = `http://localhost:5100/api/getchannels/${id}`;
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Authentication token is missing.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(url, {
                headers: { authorization: `Bearer ${token}` },
            });

            if (response.data) {
                setChannelData(response.data);
            } else {
                setError("Failed to fetch channel data.");
            }
        } catch (err) {
            setError("Error fetching channel data.");
        } finally {
            setLoading(false);
        }
    };

    const fetchVideosByChannel = async (channelId) => {
        const url = `http://localhost:5100/api/getvideos/${channelId}`;
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(url, {
                headers: { authorization: `Bearer ${token}` },
            });

            if (response.data) {
                setVideos(response.data);
            } else {
                console.error("No videos found for the channel.");
            }
        } catch (err) {
            console.error("Error fetching videos:", err);
        }
    };

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/form");
    };

    const handleImageUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = reader.result;
                if (type === "banner") {
                    setBannerImage(imageData);
                    localStorage.setItem(`channelBanner_${id}`, imageData);
                } else {
                    setProfileImage(imageData);
                    localStorage.setItem(`channelProfile_${id}`, imageData);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVideoChange = (e) => {
        const { name, value } = e.target;
        setVideoData({ ...videoData, [name]: value });
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
    
        if (!token) {
            setErrorMessage("Authentication token is missing.");
            return;
        }
    
        try {
            const url = "http://localhost:5100/api/createVideo";
            const response = await axios.post(
                url, 
                {
                    ...videoData,
                    channelId: channelData?._id,
                    channelName: channelData?.channelName,
                }, 
                {
                    headers: {
                        authorization: `Bearer ${token}`,  // Fix here
                    },
                }
            );
    
            setSuccessMessage("Video uploaded successfully!");
            setVideoData({
                title: "",
                description: "",
                videoUrl: "",
                thumbnailUrl: "",
                channelName: "",
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error uploading video:", error);
            setErrorMessage(error.response?.data?.error || error.message || "Something went wrong.");
        }
    };
    

    const handledelete = async (videoId) => {
        const url = `http://localhost:5100/api/deleteVideo/${videoId}`;
        const token = localStorage.getItem("token");

        try {
            await axios.delete(url, { headers: { authorization: `Bearer ${token}` } }); // Sends request to delete
            setVideos(videos.filter((video) => video._id !== videoId)); // Updates UI by removing the video
        } catch (err) {
            console.error("Error deleting video:", err);
        }
    };


    return (
        <>
            <div className="sticky top-0 bg-white z-50">
                <Header toggleSidebar={handleToggle} />
            </div>

            <div className="sidebar-container" style={{ display: isCollapsed ? "block" : "none", position: "fixed", left: 0, width: "220px", height: "100vh", backgroundColor: "white", transition: "transform 0.3s ease", overflowY: "auto", zIndex: 1000 }}>
                <Sidebar />
            </div>

            <div className="container p-2 flex flex-col items-end text-sm">
                <h1 className="text-sm font-bold text-left mb-2">Channel Details</h1>
                <p>Channel ID: {id}</p>
                <p>Username: {username}</p>
                <button className="px-2 py-2 mt-4 text-sm font-semibold bg-blue-600 text-white rounded-lg" onClick={handleLogout}>
                    Log out
                </button>
            </div>

            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-4xl mt-2">
                {loading ? (
                    <p>Loading channel data...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <div>
                        <div className="w-full h-48 bg-black flex justify-center items-center rounded-t-lg">
                            {bannerImage ? (
                                <img src={bannerImage} alt="Banner" className="w-full h-full object-cover rounded-t-lg" />
                            ) : (
                                <h1 className="text-4xl text-white font-bold">
                                    {channelData?.channelName || "Channel Banner"}
                                </h1>
                            )}
                        </div>
                        <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Banner Image
                            </label>
                            <input
                                type="file"
                                onChange={(e) => handleImageUpload(e, 'banner')}
                                accept="image/*"
                                className="mt-2 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                            />
                        </div>

                        <div className="flex flex-col items-center mt-4 px-4">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="rounded-full w-40 h-40 border-4 border-white -mt-12" />
                            ) : (
                                <div className="rounded-full w-40 h-40 bg-gray-200 flex justify-center items-center -mt-12">
                                    <span className="text-2xl text-white">+</span>
                                </div>
                            )}
                            <div className="mt-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Upload Profile Image
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => handleImageUpload(e, 'profile')}
                                    accept="image/*"
                                    className="mt-2 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                />
                            </div>

                            <div className="text-center mt-2">
                                <h2 className="text-2xl font-semibold text-gray-800">{channelData?.channelName || "Channel Name"}</h2>
                                <p className="text-sm text-gray-500 mt-1">{channelData?.channelDescription || "This is the channel description."}</p>
                            </div>
                        </div>

                        <div className="text-center mt-6">
                            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                                Upload Video
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {videos.map((video) => (
                                <div
                                    key={video._id}
                                    className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                                >
                                    <Link to={`/video/${video._id}`}>
                                        <img
                                            src={video.thumbnailUrl}
                                            alt={video.title}
                                            className="w-full h-40 object-cover rounded-md"
                                        />
                                        <h3 className="text-xl font-semibold mt-4 text-gray-800">{video.title}</h3>
                                        <span className="text-sm text-gray-500">Channel: {video.channelName}</span>
                                        <p className="text-sm text-gray-500"> {video.views} : Views</p>
                                    </Link>
                                    <button
                                        className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 ml-48"
                                        onClick={() => handledelete(video._id)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>

                        {isModalOpen && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-lg w-96">
                                    <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
                                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                                    {successMessage && <p className="text-green-500">{successMessage}</p>}

                                    <form onSubmit={handleVideoSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium">Title</label>
                                            <input type="text" name="title" value={videoData.title} onChange={handleVideoChange} required className="mt-2 p-2 w-full border rounded-lg" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium">Description</label>
                                            <textarea name="description" value={videoData.description} onChange={handleVideoChange} required className="mt-2 p-2 w-full border rounded-lg" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium">Video URL</label>
                                            <input type="text" name="videoUrl" value={videoData.videoUrl} onChange={handleVideoChange} required className="mt-2 p-2 w-full border rounded-lg" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium">Thumbnail URL</label>
                                            <input type="text" name="thumbnailUrl" value={videoData.thumbnailUrl} onChange={handleVideoChange} required className="mt-2 p-2 w-full border rounded-lg" />
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Submit</button>
                                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-red-600 text-white rounded-lg ml-2">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default ChannelView;











