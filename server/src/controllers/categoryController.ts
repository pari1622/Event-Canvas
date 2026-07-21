import { Request, Response } from "express";
import Category from "../models/Category.js";

const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export const createCategory = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      image,
      banner,
      isFeatured,
      isActive,
      displayOrder,
      seoTitle,
      seoDescription,
    } = req.body;

    const exists = await Category.findOne({ name });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      slug: generateSlug(name),
      description,
      image: image || "",
      banner: banner || "",
      isFeatured: isFeatured || false,
      isActive: isActive === undefined ? true : isActive,
      displayOrder: Number(displayOrder) || 0,
      seoTitle: seoTitle || "",
      seoDescription: seoDescription || "",
    });

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

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $sort: {
          displayOrder: 1,
          createdAt: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: categories.length,
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

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
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
    const {
      name,
      description,
      image,
      banner,
      isFeatured,
      isActive,
      displayOrder,
      seoTitle,
      seoDescription,
    } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.name = name;
    category.slug = generateSlug(name);
    category.description = description;
    category.image = image;
    category.banner = banner;
    category.isFeatured = isFeatured;
    category.isActive = isActive;
    category.displayOrder = Number(displayOrder);
    category.seoTitle = seoTitle;
    category.seoDescription = seoDescription;

    await category.save();

    res.json({
      success: true,
      message: "Category updated successfully",
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

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const toggleFeaturedCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.isFeatured = !category.isFeatured;

    await category.save();

    res.json({
      success: true,
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

export const toggleActiveCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.isActive = !category.isActive;

    await category.save();

    res.json({
      success: true,
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
