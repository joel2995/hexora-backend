import { ethers } from "ethers";
import { CHAINS } from "./chains.js";

export const providers = {
  shardeum: new ethers.providers.JsonRpcProvider(
    CHAINS.shardeum.rpc
  ),
  inco: new ethers.providers.JsonRpcProvider(
    CHAINS.baseSepolia.rpc
  ),
};
