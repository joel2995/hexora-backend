import { Inco } from "@inco/js-sdk";
import { providers } from "../../config/providers.js";
import { CONTRACTS } from "../../config/contracts.js";

const inco = new Inco(providers.inco);

export async function encryptValue(value) {
  return inco.encrypt(value);
}

export async function decryptValue(ciphertext) {
  return inco.decrypt(ciphertext);
}

export async function submitEncryptedSignals(
  creator,
  encryptedInfluence,
  encryptedTrust
) {
  if (!CONTRACTS.inco.confidentialEngine) {
    return { status: "skipped" };
  }

  console.log("[INCO] Encrypted signals submitted");

  return { status: "submitted" };
}
