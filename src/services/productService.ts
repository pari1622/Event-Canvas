import axios from "axios";
import API from "./api";

export const getProducts = async () => {
  const { data } = await axios.get(`${API}/products`);
  return data.products;
};

export const getCategories = async () => {
  const { data } = await axios.get(`${API}/categories`);

  return data.categories.map((category: any) => ({
    ...category,
    title: category.name,
    slug: category.name.toLowerCase().replace(/\s+/g, "-"),
    products: category.products || [],
  }));
};
export const getProductById = async (id: string) => {
  const { data } = await axios.get(`${API}/products/${id}`);
  return data.product;
};
