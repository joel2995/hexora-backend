import { ethers } from "ethers";
import { getTokenFactory } from "./blockchain.service.js";

export async function detectRole(wallet) {
  const factory = await getTokenFactory();
  const token = await factory.creatorToToken(wallet);

  if (token !== ethers.ZeroAddress) {
    return { role: "creator", creatorToken: token };
  }
  return { role: "fan" };
}
