import { Request, Response } from "express";
import Product from "../models/Product.js";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      description,
      category,
      images,
      basePrice,
      minimumOrderQuantity,
      customizationAvailable,
      isFeatured,
      isActive,
    } = req.body;

    const exists = await Product.findOne({ slug });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Product already exists",
      });
    }

    const product = await Product.create({
      name,
      slug,
      description,
      category,
      images: images || [],
      basePrice: Number(basePrice),
      minimumOrderQuantity: Number(minimumOrderQuantity),
      customizationAvailable,
      isFeatured,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
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

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
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
