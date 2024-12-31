import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  channelAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "usermodel", required: true },
  channelDescription: { type: String, required: true },
  channelBanner: { type: String }, 
  channelProfile: { type: String }, 
  channelVideos: { type: [mongoose.Schema.Types.ObjectId], ref: "Videos" },
  subscribers: { type: [mongoose.Schema.Types.ObjectId], ref: "userModel" },
  subscriberCount: { type: Number, default: 0 }, // Set default value to 0
}, { timestamps: true }); // Automatically track createdAt and updatedAt

const channelModel = mongoose.model("Channel", channelSchema);
export default channelModel;
