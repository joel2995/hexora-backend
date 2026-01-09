import { ethers } from "ethers";

export function verifySignature(wallet, signature) {
  // DEV MODE BYPASS (Postman testing only)
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  const message = "Login to HEXORA";
  const recovered = ethers.verifyMessage(message, signature);
  return recovered.toLowerCase() === wallet.toLowerCase();
}
