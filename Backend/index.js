import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { routes } from "./routes/app.routes.js";

const app = express();
const PORT = 5100;

// __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Update if needed
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Updated path

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/userAuthDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("open", () => console.log("MongoDB Connected Successfully"));
db.on("error", (error) => console.error("MongoDB Connection Failed:", error));

// Routes
routes(app);

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
