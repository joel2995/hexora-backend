import axios from "axios";

export async function uploadToIPFS(data) {
  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data,
      {
        timeout: 15000,
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_KEY
        }
      }
    );

    return `ipfs://${response.data.IpfsHash}`;
  } catch (err) {
    throw new Error("IPFS upload failed");
  }
}
