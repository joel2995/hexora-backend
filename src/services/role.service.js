import { ethers } from "ethers";
import { shardeum } from "./blockchain/index.js";

export async function detectRole(wallet) {
  const factory = await shardeum.getTokenFactory();
  const token = await factory.creatorToToken(wallet);

  if (token !== ethers.ZeroAddress) {
    return { role: "creator", creatorToken: token };
  }

  return { role: "fan" };
}
