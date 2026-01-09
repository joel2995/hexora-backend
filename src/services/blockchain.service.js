import { ethers } from "ethers";
import { CHAINS } from "../config/chains.js";
import { CONTRACTS } from "../config/contracts.js";

/**
 * NOTE:
 * - This file is deployment-ready
 * - Actual ABI + signer will be plugged in after contract deployment
 * - Current implementation is SAFE STUB (no chain writes)
 */

export async function mintOrUpdateCredentialNFT(
  wallet,
  influenceScore,
  trustScore,
  metrics,
  chain = "shardeum" // default for internal hackathon
) {
  const { accountAgeDays, volatility } = metrics;

  // -------------------------
  // Mint / Update Rules
  // -------------------------
  const CAN_MINT =
    trustScore >= 60 &&
    accountAgeDays >= 14 &&
    volatility < 0.7;

  const CAN_UPDATE =
    trustScore >= 40;

  // -------------------------
  // Chain configuration
  // -------------------------
  const chainConfig = CHAINS[chain];
  const contractConfig = CONTRACTS[chain];

  if (!chainConfig || !contractConfig) {
    throw new Error(`Unsupported chain: ${chain}`);
  }

  const { rpc } = chainConfig;
  const { credentialNFT } = contractConfig;

  // -------------------------
  // SAFETY: No deployment yet
  // -------------------------
  if (
    !credentialNFT ||
    credentialNFT === "0x0000000000000000000000000000000000000000"
  ) {
    console.log("[NFT] Contract not deployed yet");
    return {
      status: "skipped",
      reason: "contract_not_deployed"
    };
  }

  // -------------------------
  // Placeholder provider & signer
  // -------------------------
  const provider = new ethers.JsonRpcProvider(rpc);

  // signer will be enabled AFTER deployment
  // const signer = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);

  // -------------------------
  // Decision Logic
  // -------------------------
  if (CAN_MINT) {
    console.log(
      `[NFT] Mint / Update Credential NFT`,
      {
        wallet,
        influenceScore,
        trustScore,
        chain
      }
    );

    // Future:
    // await credentialContract.mintOrUpdate(wallet, influenceScore, trustScore)

    return {
      status: "mint_or_update",
      chain,
      wallet
    };
  }

  if (CAN_UPDATE) {
    console.log(
      `[NFT] Update deferred (conditions weak)`,
      {
        wallet,
        trustScore,
        chain
      }
    );

    return {
      status: "deferred",
      chain,
      wallet
    };
  }

  console.log(
    `[NFT] No action taken`,
    {
      wallet,
      trustScore,
      chain
    }
  );

  return {
    status: "no_action",
    chain,
    wallet
  };
}

/**
 * SAFE STUB — used by role.service.js
 * Will be fully wired after TokenFactory deployment
 */
export async function getTokenFactory(chain = "shardeum") {
  const chainConfig = CHAINS[chain];
  const contractConfig = CONTRACTS[chain];

  if (!chainConfig || !contractConfig) {
    throw new Error(`Unsupported chain: ${chain}`);
  }

  const { rpc } = chainConfig;
  const { tokenFactory } = contractConfig;

  // If not deployed yet, return stub
  if (
    !tokenFactory ||
    tokenFactory === "0x0000000000000000000000000000000000000000"
  ) {
    return {
      // role.service.js expects this function
      creatorToToken: async () =>
        "0x0000000000000000000000000000000000000000"
    };
  }

  // After deployment (future):
  // const provider = new ethers.JsonRpcProvider(rpc);
  // return new ethers.Contract(tokenFactory, TokenFactoryABI, provider);

  // For now, safe stub
  return {
    creatorToToken: async () =>
      "0x0000000000000000000000000000000000000000"
  };
}
