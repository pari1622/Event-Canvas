import mongoose from "mongoose";
import dotenv from "dotenv";

import Category from "../models/Category.js";
import Product from "../models/Product.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI as string);

console.log("🗑 Clearing existing data...");

await Product.deleteMany({});
await Category.deleteMany({});

console.log("📂 Creating categories...");

const printing = await Category.create({
  name: "Printing",
  slug: "printing",
  description: "Premium Printing Services",
  isFeatured: true,
  displayOrder: 1,
});

const branding = await Category.create({
  name: "Branding",
  slug: "branding",
  description: "Branding Solutions",
  isFeatured: true,
  displayOrder: 2,
});

const merchandise = await Category.create({
  name: "Merchandise",
  slug: "merchandise",
  description: "Corporate Merchandise",
  isFeatured: true,
  displayOrder: 3,
});

const gifting = await Category.create({
  name: "Corporate Gifting",
  slug: "corporate-gifting",
  description: "Luxury Gifting Solutions",
  isFeatured: true,
  displayOrder: 4,
});

const events = await Category.create({
  name: "Events",
  slug: "events",
  description: "Event Management Services",
  isFeatured: true,
  displayOrder: 5,
});

console.log("📦 Creating products...");

await Product.insertMany([
  // PRINTING
  {
    name: "Premium Visiting Cards",
    slug: "premium-visiting-cards",
    description: "Luxury visiting cards",
    category: printing._id,
    basePrice: 299,
    minimumOrderQuantity: 100,
    customizationAvailable: true,
    isFeatured: true,
    images: [],
  },
  {
    name: "Flyers",
    slug: "flyers",
    description: "Promotional flyers",
    category: printing._id,
    basePrice: 499,
    minimumOrderQuantity: 500,
    customizationAvailable: true,
    images: [],
  },
  {
    name: "Brochures",
    slug: "brochures",
    description: "Corporate brochures",
    category: printing._id,
    basePrice: 999,
    minimumOrderQuantity: 100,
    customizationAvailable: true,
    images: [],
  },
  {
    name: "Posters",
    slug: "posters",
    description: "Large format posters",
    category: printing._id,
    basePrice: 199,
    minimumOrderQuantity: 10,
    customizationAvailable: true,
    images: [],
  },

  // BRANDING
  {
    name: "LED Sign Board",
    slug: "led-sign-board",
    description: "Premium LED Signage",
    category: branding._id,
    basePrice: 5000,
    minimumOrderQuantity: 1,
    customizationAvailable: true,
    images: [],
  },
  {
    name: "Acrylic Letters",
    slug: "acrylic-letters",
    description: "Premium Acrylic Branding",
    category: branding._id,
    basePrice: 3500,
    minimumOrderQuantity: 1,
    customizationAvailable: true,
    images: [],
  },

  // MERCHANDISE
  {
    name: "Custom Mug",
    slug: "custom-mug",
    description: "Printed ceramic mug",
    category: merchandise._id,
    basePrice: 199,
    minimumOrderQuantity: 20,
    customizationAvailable: true,
    images: [],
  },
  {
    name: "Custom T-Shirt",
    slug: "custom-tshirt",
    description: "Premium Cotton T-Shirt",
    category: merchandise._id,
    basePrice: 499,
    minimumOrderQuantity: 20,
    customizationAvailable: true,
    images: [],
  },

  // GIFTING
  {
    name: "Gift Hamper",
    slug: "gift-hamper",
    description: "Luxury Corporate Gift",
    category: gifting._id,
    basePrice: 1499,
    minimumOrderQuantity: 10,
    customizationAvailable: true,
    images: [],
  },

  // EVENTS
  {
    name: "Stage Setup",
    slug: "stage-setup",
    description: "Premium Event Stage",
    category: events._id,
    basePrice: 25000,
    minimumOrderQuantity: 1,
    customizationAvailable: true,
    images: [],
  },
]);

console.log("✅ Database Seeded Successfully!");

process.exit(0);
