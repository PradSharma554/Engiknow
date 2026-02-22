import express from "express";
import { ingestRawText } from "../controllers/ingestionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/text", protect, ingestRawText);

export default router;
