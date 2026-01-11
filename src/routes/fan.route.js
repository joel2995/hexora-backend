import express from "express";
import Reputation from "../models/Reputation.model.js";

const router = express.Router();

/**
 * Fan dashboard status
 * Aggregates reputation + mock portfolio
 */
router.get("/status", async (req, res) => {
  try {
    const wallet = req.query.wallet?.toLowerCase();

    if (!wallet) {
      return res.status(400).json({ error: "Wallet required" });
    }

    const reputation = await Reputation.findOne({ wallet });

    res.json({
      wallet,

      // 🔐 THIS IS THE KEY FIX
      encryptedSignals: reputation?.encryptedSignals || null,

      // Mock / derived values (OK for hackathon)
      portfolio: [
        { creator: "0xabc...123", symbol: "CRTR", amount: 1500, value: 2340 },
        { creator: "0xdef...456", symbol: "ART", amount: 800, value: 1200 },
      ],
      totalValue: 3540,
      rewards: 125.5,
      influence: 42,
    });
  } catch (err) {
    console.error("[FAN STATUS ERROR]", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;