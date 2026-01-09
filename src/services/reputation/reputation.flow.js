import Reputation from "../../models/Reputation.model.js";
import { calculateReputation } from "./reputation.logic.js";
import { encryptValue, submitEncryptedSignals } from "../blockchain/inco.service.js";
import { mintCredentialNFT } from "../blockchain/shardeum.service.js";
import { uploadToIPFS } from "../ipfs.service.js";
import { keccakHash } from "../../utils/hash.js";

export async function processReputation(wallet, metrics) {
  const { influenceScore, trustScore } = calculateReputation(metrics);

  const encryptedInfluence = await encryptValue(influenceScore);
  const encryptedTrust = await encryptValue(trustScore);

  await submitEncryptedSignals(
    wallet,
    encryptedInfluence,
    encryptedTrust
  );

  const metadata = {
    wallet,
    influenceScore,
    trustScore,
    updatedAt: new Date()
  };

  const ipfsCID = await uploadToIPFS(metadata);
  const hash = keccakHash(ipfsCID);

  await mintCredentialNFT(wallet, influenceScore, trustScore);

  await Reputation.findOneAndUpdate(
    { wallet },
    {
      influenceScore,
      trustScore,
      ipfsCID,
      hash,
      $push: {
        history: {
          influenceScore,
          trustScore,
          timestamp: new Date()
        }
      }
    },
    { upsert: true }
  );

  return { influenceScore, trustScore };
}
