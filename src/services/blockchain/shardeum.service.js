import { ethers } from "ethers";
import { providers } from "../../config/providers.js";
import { CONTRACTS } from "../../config/contracts.js";

export async function getTokenFactory() {
  const address = CONTRACTS.shardeum.tokenFactory;

  if (!address) {
    return { creatorToToken: async () => ethers.ZeroAddress };
  }

  // ABI plugged after deployment
  return {
    creatorToToken: async () => ethers.ZeroAddress
  };
}

export async function mintCredentialNFT(
  wallet,
  influenceScore,
  trustScore
) {
  if (!CONTRACTS.shardeum.credentialNFT) {
    return { status: "skipped" };
  }

  console.log("[Shardeum] Mint Credential", {
    wallet,
    influenceScore,
    trustScore
  });

  return { status: "minted" };
}
