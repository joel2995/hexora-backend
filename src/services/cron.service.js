import cron from "node-cron";
import Reputation from "../models/Reputation.model.js";
import { calculateReputation } from "./reputation.service.js";

export function startCronJobs() {
  // ⏰ Run every day at 2 AM
  cron.schedule("0 2 * * *", async () => {
    console.log("[CRON] Daily trust recalculation started");

    const reputations = await Reputation.find();

    for (const rep of reputations) {
      // Minimal metrics for slow trust update
      const metrics = {
        recentStakeVolume: rep.influenceScore || 0,
        stakeGrowthRate: 0,
        newHolders: 0,
        holderRetention: 0.8,
        accountAgeDays: 30,
        volatility: 0.2
      };

      const { trustScore } = calculateReputation(metrics);

      rep.trustScore = trustScore;
      rep.lastTrustUpdate = new Date();

      rep.history.push({
        influenceScore: rep.influenceScore,
        trustScore,
        timestamp: new Date()
      });

      await rep.save();
    }

    console.log("[CRON] Daily trust recalculation finished");
  });
}
