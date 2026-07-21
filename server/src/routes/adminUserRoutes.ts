import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  getAllUsers,
  getSingleUser,
  removeUser,
  suspendUser,
  userStats,
} from "../controllers/adminUserController.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllUsers);

router.get("/stats", protect, adminOnly, userStats);

router.get("/:id", protect, adminOnly, getSingleUser);

router.patch("/:id/status", protect, adminOnly, suspendUser);

router.delete("/:id", protect, adminOnly, removeUser);

export default router;
