import express from "express";
import {
  askQuestion,
  getChats,
  getChatById,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/ask", protect, askQuestion);
router.get("/:workspaceId", protect, getChats);
router.get("/session/:chatId", protect, getChatById);

export default router;
