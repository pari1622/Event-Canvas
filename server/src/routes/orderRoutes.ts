import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  placeOrder,
  fetchOrders,
  fetchSingleOrder,
  userCancelOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.use(protect);

router.post("/", placeOrder);

router.get("/", fetchOrders);

router.get("/:id", fetchSingleOrder);

router.patch("/:id/cancel", userCancelOrder);

export default router;
