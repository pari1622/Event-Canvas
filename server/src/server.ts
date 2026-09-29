import dns from "dns";
import "dotenv/config";

import app from "./app.js";
import { connectDB } from "./config/db.js";

// Use reliable public DNS servers for MongoDB Atlas SRV resolution
dns.setServers(["1.1.1.1", "8.8.8.8"]);

console.log("🔥 SERVER RESTARTED");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `🚀 Parichit, the server is running on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
