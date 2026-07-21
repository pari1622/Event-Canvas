import Product from "../models/Product.js";

export const getProductsForAdmin = async () => {
  return await Product.find().populate("category").sort({
    createdAt: -1,
  });
};

export const createProductService = async (data: any) => {
  return await Product.create({
    ...data,
    slug: data.name.toLowerCase().trim().replace(/\s+/g, "-"),
  });
};

export const updateProductService = async (id: string, data: any) => {
  const product = await Product.findById(id);

  if (!product) throw new Error("Product not found");

  Object.assign(product, data);

  product.slug = product.name.toLowerCase().trim().replace(/\s+/g, "-");

  await product.save();

  return product;
};

export const removeProduct = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) throw new Error("Product not found");

  await product.deleteOne();

  return true;
};

export const duplicateProductService = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) throw new Error("Product not found");

  const copy = product.toObject();

  delete (copy as any)._id;

  copy.name += " Copy";

  copy.slug += "-" + Date.now();

  return await Product.create(copy);
};

export const toggleFeaturedService = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) throw new Error("Product not found");

  product.isFeatured = !product.isFeatured;

  await product.save();

  return product;
};

export const toggleActiveService = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) throw new Error("Product not found");

  product.isActive = !product.isActive;

  await product.save();

  return product;
};
export const getTopProductsService = async () => {
  return await Product.find()
    .sort({
      salesCount: -1,
    })
    .limit(5)
    .populate("category");
};
