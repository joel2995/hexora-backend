export function validateEnv() {
  const required = [
    "SHARDEUM_RPC_URL",
    "BASE_SEPOLIA_RPC_URL",
    "DEPLOYER_PRIVATE_KEY",
    "MONGODB_URI",
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing env variable: ${key}`);
    }
  }
}
