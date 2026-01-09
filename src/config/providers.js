import { JsonRpcProvider } from "ethers";
import { CHAINS } from "./chains.js";

/**
 * Centralized RPC providers (ethers v6)
 * Safe even if RPC URLs are missing
 */

export const providers = {
  shardeum: CHAINS.shardeum?.rpc
    ? new JsonRpcProvider(CHAINS.shardeum.rpc)
    : null,

  inco: CHAINS.baseSepolia?.rpc
    ? new JsonRpcProvider(CHAINS.baseSepolia.rpc)
    : null,

  ethereum: CHAINS.ethereum?.rpc
    ? new JsonRpcProvider(CHAINS.ethereum.rpc)
    : null,
};
