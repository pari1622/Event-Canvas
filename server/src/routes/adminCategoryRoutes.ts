import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleFeatured,
  toggleActive,
} from "../controllers/adminCategoryController.js";

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get("/", getAllCategories);

router.post("/", createCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

router.patch("/featured/:id", toggleFeatured);

router.patch("/active/:id", toggleActive);

export default router;
