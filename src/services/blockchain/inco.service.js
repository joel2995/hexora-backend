import { Lightning, supportedChains } from "@inco/js";
import { providers } from "../../config/providers.js";
import { CONTRACTS } from "../../config/contracts.js";
import { ethers } from "ethers";

/**
 * INCO Privacy Service
 * Uses official @inco/js SDK (Lightning)
 * Backend-safe abstraction
 */

// -------------------------
// Chain & environment setup
// -------------------------

// INCO runs on Base Sepolia
const INCO_CHAIN_ID = supportedChains.baseSepolia;

// Lightning client (testnet)
const lightning = Lightning.latest("testnet", INCO_CHAIN_ID);

// -------------------------
// Wallet context (backend)
// -------------------------

// Backend signer wallet (used only for encryption context)
// This does NOT deploy contracts or spend gas
const backendWallet = new ethers.Wallet(
  process.env.DEPLOYER_PRIVATE_KEY,
  providers.inco
);

// Create wallet client-like context
const walletContext = {
  accountAddress: backendWallet.address,
};

// -------------------------
// Encryption helpers
// -------------------------

export async function encryptValue(value) {
  if (value === undefined || value === null) {
    throw new Error("Cannot encrypt empty value");
  }

  const ciphertext = await lightning.encrypt(value, {
    accountAddress: walletContext.accountAddress,
    dappAddress: CONTRACTS.inco.confidentialEngine || ethers.ZeroAddress,
  });

  return ciphertext;
}

export async function decryptValue(handle) {
  if (!handle) {
    throw new Error("Missing ciphertext handle");
  }

  const reencryptor = await lightning.getReencryptor(walletContext);

  const plaintext = await reencryptor({
    handle,
  });

  return Number(plaintext);
}

// -------------------------
// On-chain signal submission
// -------------------------

export async function submitEncryptedSignals(
  creator,
  encryptedInfluence,
  encryptedTrust
) {
  if (!CONTRACTS.inco.confidentialEngine) {
    console.warn("[INCO] Confidential engine not deployed yet");
    return { status: "skipped" };
  }

  console.log("[INCO] Encrypted signals ready", {
    creator,
    encryptedInfluence,
    encryptedTrust,
  });

  // ⚠️ Actual contract call will be enabled AFTER deployment
  // Example (future):
  // await confidentialEngine.submitSignals(
  //   creator,
  //   encryptedInfluence,
  //   encryptedTrust
  // );

  return { status: "submitted" };
}
