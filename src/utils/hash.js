import { keccak256, toUtf8Bytes } from "ethers";

export function keccakHash(data) {
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }
  return keccak256(toUtf8Bytes(data));
}
