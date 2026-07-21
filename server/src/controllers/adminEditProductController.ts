import { Request, Response } from "express";
import Product from "../models/Product.js";

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.name = req.body.name;
    product.slug = req.body.slug;
    product.description = req.body.description;
    product.category = req.body.category;
    product.basePrice = Number(req.body.basePrice);
    product.minimumOrderQuantity = Number(req.body.minimumOrderQuantity);
    product.customizationAvailable = req.body.customizationAvailable;
    product.isFeatured = req.body.isFeatured;
    product.isActive = req.body.isActive;
    product.images = req.body.images || [];

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
