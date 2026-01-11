import express from "express";
import Reputation from "../models/Reputation.model.js";
import Creator from "../models/Creator.model.js";

const router = express.Router();

/**
 * GET fan dashboard data
 * 🔐 MUST return encryptedSignals for INCO flows
 */
router.get("/status/:wallet", async (req, res) => {
  try {
    const wallet = req.params.wallet.toLowerCase();

    const reputation = await Reputation.findOne({ wallet }).lean();

    const creators = await Creator.find({ isActive: true });

    res.json({
      wallet,
      encryptedSignals: reputation?.encryptedSignals || null, // 🔥 THIS FIXES EVERYTHING
      influence: reputation?.influenceScore ?? null,
      trust: reputation?.trustScore ?? null,
      portfolio: [], // keep your existing logic if any
      totalValue: 0,
      rewards: 0,
    });
  } catch (err) {
    console.error("[FAN STATUS ERROR]", err);
    res.status(500).json({ error: "Failed to load fan status" });
  }
});

export default router;