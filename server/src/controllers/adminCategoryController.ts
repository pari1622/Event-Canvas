import { Request, Response } from "express";
import {
  getCategoriesForAdmin,
  createCategoryService,
  updateCategoryService,
  removeCategory,
  toggleFeaturedService,
  toggleActiveService,
} from "../services/adminCategoryService.js";

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await getCategoriesForAdmin();

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await createCategoryService(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await updateCategoryService(
      String(req.params.id),
      req.body,
    );

    res.json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await removeCategory(String(req.params.id));

    res.json({
      success: true,
      message: "Category deleted successfully",
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
    const category = await toggleFeaturedService(String(req.params.id));

    res.json({
      success: true,
      category,
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
    const category = await toggleActiveService(String(req.params.id));

    res.json({
      success: true,
      category,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
