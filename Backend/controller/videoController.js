import videoModel from "../models/VideosModel.js";

// Video Controller
export const videoController = {
  async createVideo(req, res) {
    const { title, description, videoUrl, thumbnailUrl, channelId ,channelName } = req.body; // Get channelId from the request body
    const userId = req.user.userId;

    // Validate the input
    if (!title || !description || !videoUrl || !thumbnailUrl || !channelId || !channelName) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Create a new video entry, associate it with the channelId
        const newVideo = new videoModel({
            title,
            description,
            videoUrl,
            thumbnailUrl,
            uploadedBy: userId, // Store the user ID for who uploaded the video
            channelId,
            channelName,  // Store the channel ID
        });

        // Save the video to the database
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo); // Respond with the saved video
    } catch (error) {
        console.error("Error creating video:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
  },

  async getVideosByChannelId(req, res) {
    try {
      const { channelId } = req.params;
  
      // If a channelId is provided in the URL, fetch videos by channelId
      if (channelId) {
        const videos = await videoModel.find({ channelId }).populate('uploadedBy comments');
        if (!videos || videos.length === 0) {
          return res.status(404).json({ error: "No videos found for the given channel ID" });
        }
        return res.status(200).json(videos); // Respond with the videos belonging to the channel
      }
  
      // If no channelId is provided, fetch all videos
      const videos = await videoModel.find().populate('uploadedBy comments');
      res.status(200).json(videos); // Respond with all videos
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  


  async getVideos(req, res) {
    try {
        const { channelId } = req.query;

        let query = {};
        if (channelId) {
            query.channelId = channelId;
        }

        const videos = await videoModel.find(query).populate('uploadedBy comments');
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

  async updateVideo(req, res) {
    try {
      const { id } = req.params;
      const video = await videoModel.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteVideo(req, res) {
    try {
        const { videoId } = req.params; // Correct param name: videoId
        await videoModel.findByIdAndDelete(videoId); // Deletes from database
        res.status(200).json({ message: 'Video deleted successfully' }); // Responds with success
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handles errors
    }
},




};

