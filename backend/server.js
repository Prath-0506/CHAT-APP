import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import messageRoutes from "./routes/message.routes.js";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// ✅ Serve frontend build
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

// ✅ Catch-all for React Router
app.use((req, res, next) => {
  if (
    !req.path.startsWith("/api") &&
    !req.path.startsWith("/socket.io")
  ) {
    res.sendFile(path.join(frontendPath, "index.html"));
  } else {
    next();
  }
});

// Start server
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
