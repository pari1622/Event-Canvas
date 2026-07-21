import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import {
  generateQuote,
  fetchQuotes,
  fetchQuote,
  downloadQuotePDF,
  approveQuoteController,
  rejectQuoteController,
  convertQuoteController,
} from "../controllers/quoteController.js";

const router = express.Router();

/* ---------------- ADMIN ---------------- */

router.post("/", protect, adminOnly, generateQuote);

router.get("/", protect, fetchQuotes);

router.get("/:id", protect, fetchQuote);

router.get("/:id/pdf", protect, downloadQuotePDF);

router.patch("/:id/approve", protect, adminOnly, approveQuoteController);

router.patch("/:id/reject", protect, adminOnly, rejectQuoteController);

router.patch("/:id/convert", protect, adminOnly, convertQuoteController);

export default router;
