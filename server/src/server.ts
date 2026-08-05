import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
console.log("🔥 SERVER RESTARTED");

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `🚀 Parichit,the server is running on http://localhost:${PORT}`,
    );
  });
};

startServer();
