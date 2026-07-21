import Category from "../models/Category.js";

export const getCategoriesForAdmin = async () => {
  return await Category.find().sort({
    displayOrder: 1,
    createdAt: -1,
  });
};

export const createCategoryService = async (data: any) => {
  return await Category.create({
    ...data,
    slug: data.name.toLowerCase().trim().replace(/\s+/g, "-"),
  });
};

export const updateCategoryService = async (id: string, data: any) => {
  const category = await Category.findById(id);

  if (!category) throw new Error("Category not found");

  Object.assign(category, data);

  category.slug = category.name.toLowerCase().trim().replace(/\s+/g, "-");

  await category.save();

  return category;
};

export const removeCategory = async (id: string) => {
  const category = await Category.findById(id);

  if (!category) throw new Error("Category not found");

  await category.deleteOne();

  return true;
};

export const toggleFeaturedService = async (id: string) => {
  const category = await Category.findById(id);

  if (!category) throw new Error("Category not found");

  category.isFeatured = !category.isFeatured;

  await category.save();

  return category;
};

export const toggleActiveService = async (id: string) => {
  const category = await Category.findById(id);

  if (!category) throw new Error("Category not found");

  category.isActive = !category.isActive;

  await category.save();

  return category;
};
