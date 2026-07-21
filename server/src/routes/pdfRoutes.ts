import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { downloadQuotePDF } from "../controllers/pdfController.js";

const router = express.Router();

router.get("/quote/:id", protect, adminOnly, downloadQuotePDF);

export default router;
