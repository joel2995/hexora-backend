import { keccak256, toUtf8Bytes } from "ethers";

export function keccakHash(data) {
  return keccak256(toUtf8Bytes(data));
}
