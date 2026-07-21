import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  getAllProducts,
  deleteProduct,
  getTopProducts,
} from "../controllers/adminProductController.js";
import { updateProduct } from "../controllers/adminEditProductController.js";
import {
  toggleFeatured,
  toggleActive,
} from "../controllers/adminToggleProductController.js";
import { duplicateProduct } from "../controllers/adminDuplicateProductController.js";
import { archiveProduct } from "../controllers/adminArchiveProductController.js";
import {
  bulkDeleteProducts,
  bulkArchiveProducts,
} from "../controllers/adminBulkProductController.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllProducts);
router.get("/top", protect, adminOnly, getTopProducts);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.patch("/:id/featured", protect, adminOnly, toggleFeatured);

router.patch("/:id/active", protect, adminOnly, toggleActive);
router.post("/:id/duplicate", protect, adminOnly, duplicateProduct);
router.patch("/:id/archive", protect, adminOnly, archiveProduct);
router.post("/bulk/delete", protect, adminOnly, bulkDeleteProducts);

router.post("/bulk/archive", protect, adminOnly, bulkArchiveProducts);

export default router;
