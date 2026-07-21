import { Request, Response } from "express";
import Product from "../models/Product.js";

export const duplicateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const copy = await Product.create({
      ...product.toObject(),
      _id: undefined,
      name: `${product.name} Copy`,
      slug: `${product.slug}-${Date.now()}`,
      createdAt: undefined,
      updatedAt: undefined,
    });

    res.json({
      success: true,
      product: copy,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
