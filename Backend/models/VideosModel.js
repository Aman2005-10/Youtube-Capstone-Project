import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    description: { type: String, default: "" },
    videoUrl: { type: String, required: true },
    category: { type: String, default: "General" },
    channelName:{type:String , required:true },
    views: { type: Number, default: 1000 },
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming User model
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: "Channel", required: true }, // Add this line
    // channelAuthor:{type:mongoose.Schema.Types.ObjectId, ref:"Channel" ,required:true },
});


const Video = mongoose.model("Video", videoSchema);

export default Video;
