import mongoose from "mongoose";

/**
 * Historical plaintext reputation snapshots
 */
const ReputationHistorySchema = new mongoose.Schema(
  {
    influenceScore: Number,
    trustScore: Number,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

/**
 * Main Reputation schema
 * Supports:
 * - Encrypted INCO inputs
 * - Optional attested reveals (E)
 */
const ReputationSchema = new mongoose.Schema(
  {
    // -------------------------
    // Identity
    // -------------------------
    wallet: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    // -------------------------
    // 🔐 INCO ENCRYPTED INPUTS (A+B)
    // -------------------------
    encryptedSignals: {
      engagement: String,
      stakingVelocity: String,
    },

    // -------------------------
    // 🔓 INCO ATTESTED DECRYPT / REVEAL (E)
    // Stored ONLY after user consent
    // -------------------------
    revealed: {
  type: Map,
  of: new mongoose.Schema(
    {
      value: mongoose.Schema.Types.Mixed,
      proof: String,
      attestedBy: String,
      timestamp: Number,
    },
    { _id: false }
  ),
  default: {},
},

    // -------------------------
    // Plaintext Scores (legacy / hybrid)
    // -------------------------
    influenceScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    trustScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    // -------------------------
    // IPFS anchoring
    // -------------------------
    ipfsCID: String,
    hash: String,

    // -------------------------
    // Epoch / versioning
    // -------------------------
    epoch: {
      type: Number,
      default: 0,
    },

    // -------------------------
    // Historical scores
    // -------------------------
    history: {
      type: [ReputationHistorySchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Keep history bounded
ReputationSchema.pre("save", function () {
  if (this.history.length > 50) {
    this.history = this.history.slice(-50);
  }
});

export default mongoose.model("Reputation", ReputationSchema);