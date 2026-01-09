import { ethers } from "ethers";
import { providers } from "../config/providers.js";
import { CONTRACTS } from "../config/contracts.js";
import { processReputation } from "./reputation/reputation.flow.js";

/**
 * Event-driven listeners
 * Safe to run even before deployment
 */
export function startEventListeners() {
  console.log("[Events] Initializing listeners...");

  // -------------------------
  // Shardeum listeners
  // -------------------------
  const shardeumProvider = providers.shardeum;

  if (!shardeumProvider) {
    console.warn("[Events] Shardeum provider not available");
    return;
  }

  // Optional: block-based trigger (lightweight)
  shardeumProvider.on("block", (blockNumber) => {
    if (blockNumber % 20 === 0) {
      console.log(`[Events] Shardeum block ${blockNumber}`);
    }
  });

  // -------------------------
  // NFT Mint / Update Events
  // -------------------------
  const nftAddress = CONTRACTS.shardeum.credentialNFT;

  if (nftAddress) {
    console.log("[Events] NFT listener enabled");

    // ABI will be plugged later
    const nftAbi = [
      "event Transfer(address indexed from, address indexed to, uint256 tokenId)"
    ];

    const nftContract = new ethers.Contract(
      nftAddress,
      nftAbi,
      shardeumProvider
    );

    nftContract.on("Transfer", async (from, to, tokenId) => {
      if (from === ethers.ZeroAddress) {
        console.log("[Events] Credential NFT minted", {
          to,
          tokenId: tokenId.toString()
        });

        // Optional future hook
        // await processReputation(to, metrics)
      }
    });
  } else {
    console.warn("[Events] CredentialNFT not deployed yet");
  }

  // -------------------------
  // INCO Score Finalization
  // -------------------------
  const incoProvider = providers.inco;
  const engineAddress = CONTRACTS.inco.confidentialEngine;

  if (incoProvider && engineAddress) {
    console.log("[Events] INCO engine listener enabled");

    const engineAbi = [
      "event ScoresFinalized(address indexed creator, uint256 influenceScore, uint256 trustScore)"
    ];

    const engine = new ethers.Contract(
      engineAddress,
      engineAbi,
      incoProvider
    );

    engine.on(
      "ScoresFinalized",
      async (creator, influenceScore, trustScore) => {
        console.log("[Events] INCO scores finalized", {
          creator,
          influenceScore: influenceScore.toString(),
          trustScore: trustScore.toString()
        });

        // Metrics can be fetched or recomputed
        // await processReputation(creator, metrics)
      }
    );
  } else {
    console.warn("[Events] INCO engine not deployed yet");
  }

  console.log("[Events] Listeners started");
}
