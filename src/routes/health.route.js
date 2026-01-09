import express from "express";
import Reputation from "../models/Reputation.model.js";

const router = express.Router();

router.get("/status", async (_, res) => {
  const totalCreators = await Reputation.countDocuments();
  const activeCreators = await Reputation.countDocuments({
    influenceScore: { $gt: 20 }
  });

  res.json({
    protocol: "HEXORA",
    creators: totalCreators,
    activeCreators,
    timestamp: Date.now()
  });
});

export default router;
