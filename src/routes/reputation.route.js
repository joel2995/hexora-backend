import express from "express";
import { processReputation } from "../services/reputation/reputation.flow.js";

const router = express.Router();

/**
 * Main reputation update endpoint
 * All logic lives in reputation.flow
 */
router.post("/update", async (req, res) => {
  console.log("✅ /reputation/update HIT", req.body)
  try {
    const { wallet, metrics } = req.body;

    if (!wallet || !metrics) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const result = await processReputation(
      wallet.toLowerCase(),
      metrics
    );

    res.json(result);
  } catch (err) {
    console.error("[REPUTATION FLOW ERROR]", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
