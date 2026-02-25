import express from "express";
import {
  ingestRawText,
  getIngestions,
  getIngestionById,
} from "../controllers/ingestionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/text", protect, ingestRawText);
router.get("/:workspaceId", protect, getIngestions);
router.get("/detail/:documentId", protect, getIngestionById);

export default router;
