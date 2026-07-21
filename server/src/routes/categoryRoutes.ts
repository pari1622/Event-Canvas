import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  toggleFeaturedCategory,
  toggleActiveCategory,
} from "../controllers/categoryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

/* Public */

router.get("/", getCategories);
router.get("/:id", getCategoryById);

/* Admin */

router.post("/", protect, adminOnly, createCategory);

router.put("/:id", protect, adminOnly, updateCategory);

router.delete("/:id", protect, adminOnly, deleteCategory);

router.patch("/featured/:id", protect, adminOnly, toggleFeaturedCategory);

router.patch("/active/:id", protect, adminOnly, toggleActiveCategory);

export default router;
