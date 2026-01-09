import { ethers } from "ethers";

export function verifySignature(wallet, signature) {
  const message = "Login to HEXORA";
  const recovered = ethers.verifyMessage(message, signature);
  return recovered.toLowerCase() === wallet.toLowerCase();
}
