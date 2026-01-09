import { ethers } from "ethers";
import { CHAINS } from "../../config/chains.js";
import { CONTRACTS } from "../../config/contracts.js";

const ABI = [
  "function mintCredential(address,uint256,uint256) external",
];

export async function mintCredentialNFT({
  wallet,
  influenceScore,
  trustScore,
  chain = "shardeum",
}) {
  const rpc = CHAINS[chain].rpc;
  const contractAddress = CONTRACTS[chain].credentialNFT;

  if (!rpc || !contractAddress) {
    console.log("[NFT] Contract not deployed");
    return;
  }

  const provider = new ethers.JsonRpcProvider(rpc);
  const signer = new ethers.Wallet(
    process.env.ADMIN_PRIVATE_KEY,
    provider
  );

  const nft = new ethers.Contract(contractAddress, ABI, signer);

  const tx = await nft.mintCredential(
    wallet,
    influenceScore,
    trustScore
  );

  await tx.wait();

  console.log("[NFT] Credential minted for", wallet);
}
