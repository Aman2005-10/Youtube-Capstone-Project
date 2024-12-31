import channelModel from "../models/ChannalModel.js"; 

export const channelController = {
  // Create Channel
  async createChannel(req, res) {
    const { channelDescription, channelName } = req.body;
    const channelAuthor = req.user.userId;
  
    if (!channelDescription || !channelName) {
      return res.status(400).json({ error: "Channel description and name are required" });
    }
  
    try {
      const channel = await channelModel.create({
        channelDescription,
        channelAuthor,
        channelName,
      });
  
      res.status(201).json(channel);
    } catch (error) {
      console.error("Error creating channel:", error);
      res.status(500).json({ error: "Error creating channel", details: error.message });
    }
  },

  // Get all Channels for a user
  async getChannels(req, res) {
    try {
      const channels = await channelModel.find({ channelAuthor: req.user.userId });
      res.status(200).json(channels);
    } catch (error) {
      console.error("Error fetching channels:", error); // For debugging
      res.status(500).json({ error: "Error fetching channels", details: error.message });
    }
  },

  // Get Channel by ID
  async getChannelById(req, res) {
    const { id } = req.params; // Extract ID from URL parameters
    try {
        const channel = await channelModel.findOne({
            _id: id,
            channelAuthor: req.user.userId, // Ensure the user owns the channel
        });
        
        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        res.status(200).json(channel);
    } catch (error) {
        console.error("Error fetching channel by ID:", error); // For debugging
        res.status(500).json({ error: "Error fetching channel", details: error.message });
    }
  },

  // Update Channel
  async updateChannel(req, res) {
    const { id } = req.params;
    const { channelName, channelDescription } = req.body;
  
    if (!channelName || !channelDescription) {
      return res.status(400).json({ error: "Channel name and description are required" });
    }
  
    try {
      const updateData = {
        channelName,
        channelDescription,
      };
  
      const channel = await channelModel.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }
  
      res.status(200).json(channel);
    } catch (error) {
      console.error("Error updating channel:", error);
      res.status(500).json({ error: "Error updating channel", details: error.message });
    }
  },
  

  // Delete Channel
  async deleteChannel(req, res) {
    const { id } = req.params;
    const channelAuthor = req.user.userId;
  
    try {
      const channel = await channelModel.findById(id);

      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      // Check if the logged-in user is the channel's author
      if (channel.channelAuthor.toString() !== channelAuthor) {
        return res.status(403).json({ error: "You do not have permission to delete this channel" });
      }

      await channel.deleteOne();

      res.status(200).json({ message: "Channel deleted successfully" });
    } catch (error) {
      console.error("Error deleting channel:", error);
      res.status(500).json({ error: "Error deleting channel", details: error.message });
    }
  }
}
