import { userController } from "../controller/userController.js";
import { channelController } from "../controller/channelController.js";
import { videoController } from "../controller/videoController.js";
import { commentController } from "../controller/commentController.js";
import {authenticate} from "../middleware/authmiddlware.js";

export function routes(app) {
  // User Routes
  app.post("/api/register", userController.register);
  app.post("/api/login", userController.login);
  app.post("/api/createUser", userController.createUser);
  app.get("/api/getUsers", userController.getUsers);
  app.put("/api/updateUser/:id", userController.updateUser);
  app.delete("/api/deleteUser/:id", userController.deleteUser);

  // Video Routes
  app.post("/api/createVideo", authenticate, videoController.createVideo);
  app.get("/api/getVideos", authenticate, videoController.getVideos);
  app.get('/api/getvideos/:channelId', authenticate, videoController.getVideosByChannelId);
  app.put("/api/updateVideo/:id", videoController.updateVideo);
  app.delete("/api/deleteVideo/:videoId", authenticate, videoController.deleteVideo);


  // Comment Routes
  app.post("/api/createComment",  authenticate, commentController.createComment);
  app.get("/api/getComments/:id", commentController.getComments);
  app.put("/api/editComment/:id", authenticate, commentController.editComment);
  app.delete("/api/deleteComment/:id", commentController.deleteComment);

  // Channel Routes
  app.post("/api/createChannel", authenticate, channelController.createChannel);
  app.get("/api/getChannels",authenticate, channelController.getChannels); // Ensure authentication
  app.get("/api/getChannels/:id", authenticate, channelController.getChannelById);
  app.put("/api/updateChannel/:id", authenticate, channelController.updateChannel);
  app.delete("/api/deleteChannel/:id", authenticate, channelController.deleteChannel);
}
