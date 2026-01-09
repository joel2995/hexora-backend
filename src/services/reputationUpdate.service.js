import Reputation from "../models/Reputation.model.js";
import { calculateReputation } from "./reputation.service.js";

export async function recalcInfluenceOnly(wallet, metrics) {
  const reputation = await Reputation.findOne({ wallet });
  if (!reputation) return;

  const { influenceScore } = calculateReputation(metrics);

  reputation.influenceScore = influenceScore;
  reputation.lastInfluenceUpdate = new Date();

  reputation.history.push({
    influenceScore,
    trustScore: reputation.trustScore,
    timestamp: new Date()
  });

  await reputation.save();

  console.log("[L2] Influence updated for", wallet);
}
