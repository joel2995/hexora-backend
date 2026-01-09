import { ethers } from "ethers";
import { CHAINS } from "../../config/chains.js";

export async function getERC20Balance({
  tokenAddress,
  wallet,
  chain = "shardeum",
}) {
  const rpc = CHAINS[chain].rpc;
  if (!rpc) throw new Error("RPC not configured");

  const provider = new ethers.JsonRpcProvider(rpc);

  const ERC20_ABI = [
    "function balanceOf(address) view returns (uint256)",
    "function decimals() view returns (uint8)",
  ];

  const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

  const [balance, decimals] = await Promise.all([
    token.balanceOf(wallet),
    token.decimals(),
  ]);

  return {
    raw: balance.toString(),
    formatted: ethers.formatUnits(balance, decimals),
  };
}
