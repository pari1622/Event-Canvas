import QuoteBag from "../models/QuoteBag.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import { sendQuoteRequestEmail } from "./emailService.js";

export const getQuoteBag = async (userId: string) => {
  return await QuoteBag.find({ user: userId }).populate("product");
};

export const addToQuoteBag = async (
  userId: string,
  productId: string,
  quantity: number,
  notes: string,
) => {
  const user = await User.findById(userId);
  const product = await Product.findById(productId);

  if (!user || !product) {
    throw new Error("Invalid User or Product");
  }

  const item = await QuoteBag.create({
    user: userId,
    product: productId,
    quantity,
    notes,
  });

  try {
    await sendQuoteRequestEmail(user.name, user.email, product.name, quantity);
  } catch (error) {
    console.error("QUOTE REQUEST EMAIL ERROR:", error);
  }

  return item;
};

export const removeFromQuoteBag = async (id: string) => {
  await QuoteBag.findByIdAndDelete(id);
};
