import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import creatorRoutes from "./routes/creator.route.js";
import fanRoutes from "./routes/fan.route.js";
import reputationRoutes from "./routes/reputation.route.js";
import healthRoutes from "./routes/health.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ status: "HEXORA Backend Running" });
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/creator", creatorRoutes);
app.use("/fan", fanRoutes);
app.use("/reputation", reputationRoutes);
app.use("/health", healthRoutes);

export default app;
