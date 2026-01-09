import Reputation from "../../models/Reputation.model.js";
import { calculateReputation } from "./reputation.service.js";
import { uploadToIPFS } from "../ipfs.service.js";
import { keccakHash } from "../../utils/hash.js";
import { mintCredentialNFT } from "../blockchain/credentialNFT.service.js";

export async function processReputation(wallet, metrics) {
  let reputation = await Reputation.findOne({ wallet });
  if (!reputation) reputation = new Reputation({ wallet });

  // -------------------------
  // 1️⃣ Calculate scores
  // -------------------------
  const { influenceScore, trustScore } =
    calculateReputation(metrics);

  const now = new Date();

  // -------------------------
  // 2️⃣ IPFS metadata
  // -------------------------
  const ipfsData = {
    wallet,
    scores: {
      influence: influenceScore,
      trust: trustScore,
    },
    metrics,
    timestamp: now.toISOString(),
  };

  const ipfsCID = await uploadToIPFS(ipfsData);
  const hash = keccakHash(ipfsCID);

  // -------------------------
  // 3️⃣ Update DB
  // -------------------------
  reputation.influenceScore = influenceScore;
  reputation.trustScore = trustScore;
  reputation.ipfsCID = ipfsCID;
  reputation.hash = hash;

  reputation.history.push({
    influenceScore,
    trustScore,
    timestamp: now,
  });

  await reputation.save();

  // -------------------------
  // 4️⃣ Mint Credential NFT (ON-CHAIN)
  // -------------------------
  await mintCredentialNFT({
    wallet,
    influenceScore,
    trustScore,
  });

  // -------------------------
  // 5️⃣ Return response
  // -------------------------
  return {
    wallet,
    influenceScore,
    trustScore,
    ipfsCID,
    hash,
  };
}
