import express from "express";
import { verifySignature } from "../services/wallet.service.js";
import User from "../models/User.model.js";

const router = express.Router();

router.post("/verify", async (req, res) => {
  const { wallet, signature } = req.body;

  if (!verifySignature(wallet, signature)) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  await User.findOneAndUpdate(
    { wallet },
    { lastSeenAt: new Date() },
    { upsert: true }
  );

  res.json({ success: true });
});

export default router;
