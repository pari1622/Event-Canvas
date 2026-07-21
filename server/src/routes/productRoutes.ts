import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";
import { uploadImage } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", protect, adminOnly, upload.single("image"), uploadImage);

router.post("/", protect, adminOnly, createProduct);

router.get("/:id", getProductById);

router.get("/", getProducts);

export default router;
