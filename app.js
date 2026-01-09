import express from "express";
import cors from "cors";

import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";
import creatorRoutes from "./src/routes/creator.route.js";
import fanRoutes from "./src/routes/fan.route.js";
import reputationRoutes from "./src/routes/reputation.route.js";
import healthRoutes from "./src/routes/health.route.js";
import balanceRoutes from "./src/routes/balance.route.js";

const app = express();

// -------------------------
// Middleware
// -------------------------
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// -------------------------
// Health root
// -------------------------
app.get("/", (_, res) => {
  res.json({
    protocol: "HEXORA",
    status: "Backend running",
    timestamp: Date.now(),
  });
});

// -------------------------
// Routes
// -------------------------
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/creator", creatorRoutes);
app.use("/fan", fanRoutes);
app.use("/reputation", reputationRoutes);
app.use("/health", healthRoutes);
app.use("/balance", balanceRoutes);
// -------------------------
// Global error fallback
// -------------------------
app.use((err, req, res, next) => {
  console.error("[GLOBAL ERROR]", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
