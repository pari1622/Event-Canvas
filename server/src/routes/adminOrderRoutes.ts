import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import {
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  removeOrder,
  orderStats,
} from "../controllers/adminOrderController.js";
import { generateQuote } from "../controllers/quoteController.js";

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get("/", getAllOrders);

router.get("/stats", orderStats);

router.get("/:id", getSingleOrder);
router.post("/:id/quote", generateQuote);

router.put("/:id", updateOrderStatus);

router.delete("/:id", removeOrder);

export default router;
