// importing packages
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";

// importing modules
import errorHandler from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";

// importing routes
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import socketConnection from "./socket/index.js";

// Env Configuration
dotenv.config();

// Create an instance of express app
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3050;

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // or restrict to your frontend URL
    methods: ["GET", "POST"],
  },
});

// Call socket connection handler
socketConnection(io);

// Apply middleware for CORS and bodyParser
app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// Serving static files from the public directory
app.use("/public", express.static("public/"));

// Import all routes
app.use(`/api/v1/user`, userRoutes);
app.use(`/api/v1/blog`, blogRoutes);

// Error Handling middleware
app.use(errorHandler);

// Connect to Database
connectDB();

// Server is running at port 5000
server.listen(PORT, console.log(`Server is Started at Port : ${PORT}`));
