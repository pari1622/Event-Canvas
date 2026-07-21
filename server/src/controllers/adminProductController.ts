import { Request, Response } from "express";
import {
  getProductsForAdmin,
  createProductService,
  updateProductService,
  removeProduct,
  duplicateProductService,
  toggleFeaturedService,
  toggleActiveService,
  getTopProductsService,
} from "../services/adminProductService.js";

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getProductsForAdmin();

    res.json({
      success: true,
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

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createProductService(req.body);

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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await updateProductService(String(req.params.id), req.body);

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await removeProduct(String(req.params.id));

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const duplicateProduct = async (req: Request, res: Response) => {
  try {
    const product = await duplicateProductService(String(req.params.id));

    res.status(201).json({
      success: true,
      message: "Product duplicated successfully",
      product,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleFeatured = async (req: Request, res: Response) => {
  try {
    const product = await toggleFeaturedService(String(req.params.id));

    res.json({
      success: true,
      product,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleActive = async (req: Request, res: Response) => {
  try {
    const product = await toggleActiveService(String(req.params.id));

    res.json({
      success: true,
      product,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
export const getTopProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getTopProductsService();

    res.json({
      success: true,
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
