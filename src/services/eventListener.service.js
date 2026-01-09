import { ethers } from "ethers";
import { CHAINS } from "../config/chains.js";
import { recalcInfluenceOnly } from "./reputationUpdate.service.js";

/**
 * Layer 2 — Event-driven influence updates
 * Safe startup even if RPC is missing
 */

export function startEventListeners(chain = "shardeum") {
  const chainConfig = CHAINS[chain];

  if (!chainConfig) {
    console.warn(`[L2] Unknown chain: ${chain}`);
    return;
  }

  if (!chainConfig.rpc) {
    console.warn(
      `[L2] RPC URL not set for ${chain}. Event listeners disabled.`
    );
    return;
  }

  const provider = new ethers.JsonRpcProvider(chainConfig.rpc);

  console.log(`[L2] Event listeners started on ${chain}`);

  // -------------------------
  // MOCK BLOCK LISTENER
  // -------------------------
  provider.on("block", async (blockNumber) => {
    if (blockNumber % 10 === 0) {
      console.log(
        `[L2] Block ${blockNumber} → Influence recalculation trigger`
      );

      // Future:
      // recalcInfluenceOnly(wallet, metrics)
    }
  });
}