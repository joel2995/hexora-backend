import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./src/config/db.js";
import { validateEnv } from "./src/config/env.js";
import { startEventListeners } from "./src/services/eventListener.service.js";
import { startCronJobs } from "./src/services/cron.service.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // -------------------------
    // Validate environment
    // -------------------------
    validateEnv();

    // -------------------------
    // Database first
    // -------------------------
    await connectDB();

    // -------------------------
    // Background services
    // -------------------------
    startCronJobs();
    startEventListeners();

    // -------------------------
    // Start HTTP server
    // -------------------------
    app.listen(PORT, () => {
      console.log(`🚀 HEXORA backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();
