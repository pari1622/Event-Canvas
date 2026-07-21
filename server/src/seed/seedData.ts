import mongoose from "mongoose";
import dotenv from "dotenv";

import Category from "../models/Category.js";
import Product from "../models/Product.js";
dotenv.config();

await mongoose.connect(process.env.MONGODB_URI as string);

await Category.deleteMany();
await Product.deleteMany();

const printing = await Category.create({
  name: "Printing",
  description: "Premium Printing Services",
});

const branding = await Category.create({
  name: "Branding",
  description: "Branding Solutions",
});

const merchandise = await Category.create({
  name: "Merchandise",
  description: "Corporate Merchandise",
});

const gifting = await Category.create({
  name: "Corporate Gifting",
  description: "Luxury Gifting Solutions",
});

const events = await Category.create({
  name: "Events",
  description: "Event Management Services",
});

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
  },
  {
    name: "Flyers",
    slug: "flyers",
    description: "Promotional flyers",
    category: printing._id,
    basePrice: 499,
    minimumOrderQuantity: 500,
    customizationAvailable: true,
  },
  {
    name: "Brochures",
    slug: "brochures",
    description: "Corporate brochures",
    category: printing._id,
    basePrice: 999,
    minimumOrderQuantity: 100,
    customizationAvailable: true,
  },
  {
    name: "Posters",
    slug: "posters",
    description: "Large format posters",
    category: printing._id,
    basePrice: 199,
    minimumOrderQuantity: 10,
    customizationAvailable: true,
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
  },
  {
    name: "Acrylic Letters",
    slug: "acrylic-letters",
    description: "Premium Acrylic Branding",
    category: branding._id,
    basePrice: 3500,
    minimumOrderQuantity: 1,
    customizationAvailable: true,
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
  },
  {
    name: "Custom T-Shirt",
    slug: "custom-tshirt",
    description: "Premium Cotton T-Shirt",
    category: merchandise._id,
    basePrice: 499,
    minimumOrderQuantity: 20,
    customizationAvailable: true,
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
  },
]);

console.log("✅ Database Seeded");

process.exit();
