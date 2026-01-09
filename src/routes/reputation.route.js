import express from "express";
import Reputation from "../models/Reputation.model.js";
import {
  calculateReputation,
  canUpdateInfluence,
  canUpdateTrust
} from "../services/reputation.service.js";
import { uploadToIPFS } from "../services/ipfs.service.js";
import { keccakHash } from "../utils/hash.js";
import { mintOrUpdateCredentialNFT } from "../services/blockchain.service.js";

const router = express.Router();

router.post("/update", async (req, res) => {
  try {
    const { wallet, metrics } = req.body;

    let reputation = await Reputation.findOne({ wallet });
    if (!reputation) reputation = new Reputation({ wallet });

    // ✅ ONLY SCORES COME FROM THIS
    const { influenceScore, trustScore } =
      calculateReputation(metrics);

    const now = new Date();

    // -------------------------
    // Cooldown enforcement
    // -------------------------
    if (
      !canUpdateInfluence(reputation.lastInfluenceUpdate) &&
      !canUpdateTrust(reputation.lastTrustUpdate)
    ) {
      return res.status(429).json({
        error: "Score update cooldown active"
      });
    }

    // -------------------------
    // Versioned IPFS metadata
    // -------------------------
    const ipfsData = {
      version: "v1",
      wallet,
      scores: {
        influence: influenceScore,
        trust: trustScore
      },
      breakdown: metrics,
      timestamp: now.toISOString()
    };

    const ipfsCID = await uploadToIPFS(ipfsData);
    const hash = keccakHash(ipfsCID);

    // -------------------------
    // Update reputation record
    // -------------------------
    reputation.influenceScore = influenceScore;
    reputation.trustScore = trustScore;
    reputation.ipfsCID = ipfsCID;
    reputation.hash = hash;

    if (canUpdateInfluence(reputation.lastInfluenceUpdate)) {
      reputation.lastInfluenceUpdate = now;
    }

    if (canUpdateTrust(reputation.lastTrustUpdate)) {
      reputation.lastTrustUpdate = now;
    }

    reputation.history.push({
      influenceScore,
      trustScore,
      timestamp: now
    });

    await reputation.save();

    // -------------------------
    // Credential NFT orchestration
    // -------------------------
    await mintOrUpdateCredentialNFT(
      wallet,
      influenceScore,
      trustScore,
      metrics
    );

    res.json({
      wallet,
      influenceScore,
      trustScore,
      ipfsCID,
      hash
    });

  } catch (err) {
    console.error("[REPUTATION UPDATE ERROR]", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;