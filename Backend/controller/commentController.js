import { useId } from "react";
import commentModel from "../models/CommentModel.js";

export const commentController = {
  // Create comment
  async createComment(req, res) {
   const UserId = req.user.userId;
    try {
      // Destructure the comment text, userId, and videoId from req.body
      const { text,  videoId , channelName } = req.body;
  
      // Validate required fields
      if (!text  || !videoId || !channelName) {
        return res.status(400).json({ error: "All fields (text,  videoId) are required." });
      }
  
      // Create the comment in the database
      const comment = await commentModel.create({
        text,
        userId:UserId,
        videoId,
        channelName
      });
  
      // Return the newly created comment
      return res.status(201).json(comment);
  
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  
    
  },

  // Get comments for a video
  async getComments(req, res) {
    try {
      const { id } = req.params;
      const comments = await commentModel.find({ videoId: id }).populate("userId videoId");
      console.log('Fetched comments:', comments);
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: error.message });
    }
  },
  
  async editComment(req, res) {
    const { id } = req.params;
    const { text } = req.body;
  
    try {
      // Find the comment by ID
      const comment = await commentModel.findById(id);
  
      // If the comment doesn't exist, return an error
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      // Check if the logged-in user is the author of the comment
      if (comment.userId.toString() !== req.user.userId) {
        return res.status(403).json({ error: "You are not authorized to edit this comment" });
      }
  
      // Update the comment text
      comment.text = text;
  
      // Save the updated comment to the database
      await comment.save();
  
      // Return the updated comment
      return res.status(200).json(comment);
    } catch (error) {
      console.error("Error updating comment:", error);
      return res.status(500).json({ error: error.message });
    }
  },
  

  // Delete comment
  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      await commentModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
