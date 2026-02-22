import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import ingestionRoutes from "./routes/ingestionRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/ingest", ingestionRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Engiknow API is running" });
});

// Connect to Data and Vector DB
connectDB();
import { initPinecone } from "./config/pinecone.js";
initPinecone();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
