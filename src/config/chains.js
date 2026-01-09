export const CHAINS = {
  shardeum: {
    name: "Shardeum Testnet",
    rpc: process.env.SHARDEUM_RPC_URL,
    chainId: 8082, // Sphinx testnet
  },

  baseSepolia: {
    name: "Base Sepolia (INCO)",
    rpc: process.env.BASE_SEPOLIA_RPC_URL,
    chainId: 84532,
  },
};
