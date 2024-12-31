import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
  channelName : { type: String, required: true },
});

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;
