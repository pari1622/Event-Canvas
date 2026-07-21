import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import quoteBagRoutes from "./routes/quoteBagRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminProductRoutes from "./routes/adminProductRoutes.js";
import adminCategoryRoutes from "./routes/adminCategoryRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
const app = express();
import pdfRoutes from "./routes/pdfRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";

app.use(cors());
app.use(express.json());
app.use("/api/profile", (req, res, next) => {
  console.log("PROFILE ROUTE HIT");
  next();
});

app.use("/api/profile", profileRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "EventCanvas Backend Running 🚀",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/quotebag", quoteBagRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/pdf", pdfRoutes);

export default app;
