import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

const JWT_SECRET = "your_jwt_secret_key";

// User Controller
export const userController = {
  // User Registration
  async register(req, res) {
    const { username, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await userModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({ username, email, password: hashedPassword });
      
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });

    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  },

  // User Login
  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Find user by username
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.status(200).json({ message: "Login successful", token });

    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  },

  // Get All Users
  async getUsers(req, res) {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create User (Admin only or for testing)
  async createUser(req, res) {
    try {
      const user = await userModel.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update User
  async updateUser(req, res) {
    const { id } = req.params;

    try {
      const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) return res.status(404).json({ error: "User not found" });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete User
  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const user = await userModel.findByIdAndDelete(id);
      if (!user) return res.status(404).json({ error: "User not found" });

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
