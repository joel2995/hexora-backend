import axios from "axios";

/**
 * Upload JSON metadata to IPFS using Pinata
 */
export async function uploadToIPFS(data) {
  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_KEY
        }
      }
    );

    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error("[IPFS ERROR]", error.response?.data || error.message);
    throw new Error("IPFS upload failed");
  }
}