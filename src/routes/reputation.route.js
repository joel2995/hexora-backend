import express from "express";
import crypto from "crypto";
import Reputation from "../models/Reputation.model.js";
import { uploadToIPFS } from "../services/ipfs.service.js";

const router = express.Router();

router.post("/update", async (req, res) => {
  try {
    const { wallet, encryptedSignals } = req.body;

    if (!wallet || !encryptedSignals) {
      return res.status(400).json({
        error: "Invalid payload",
        expected: ["wallet", "encryptedSignals"],
        received: req.body,
      });
    }

    // 🔐 Encrypted reputation payload (NO PLAINTEXT EVER)
    const payload = {
      wallet: wallet.toLowerCase(),
      encryptedSignals,
      timestamp: Date.now(),
    };

    // 🌍 Upload encrypted blob to IPFS
    const ipfsCID = await uploadToIPFS(payload);
    console.log("📦 IPFS upload successful:", ipfsCID);

    // 🔑 Hash for anchoring / proof
    const hash = crypto
      .createHash("sha256")
      .update(JSON.stringify(payload))
      .digest("hex");
    console.log("🔐 Encrypted payload stored, hash:", hash);

    // 💾 Persist reputation (encrypted-only storage)
    const record = await Reputation.findOneAndUpdate(
      { wallet: wallet.toLowerCase() },
      {
        encryptedSignals,
        ipfsCID,
        hash,
        $inc: { epoch: 1 },
      },
      { upsert: true, new: true }
    );

    return res.json({
      ok: true,
      ipfsCID,
      hash,
      epoch: record.epoch,
    });
  } catch (err) {
    console.error("[REPUTATION UPDATE ERROR]", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;