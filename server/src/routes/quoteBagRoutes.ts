import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getBag,
  addItem,
  removeItem,
} from "../controllers/quoteBagController.js";

const router = express.Router();

router.get("/", protect, getBag);
router.post("/", protect, addItem);
router.delete("/:id", protect, removeItem);

export default router;
