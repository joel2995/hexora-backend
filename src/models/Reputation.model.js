import mongoose from "mongoose";

/**
 * Historical reputation snapshots
 * (used only when plaintext scores are computed)
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
 * Supports BOTH:
 * 1) Legacy plaintext reputation
 * 2) INCO encrypted reputation inputs
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
    // 🔐 INCO ENCRYPTED INPUTS (B)
    // Backend NEVER decrypts these
    // -------------------------
    encryptedSignals: {
      engagement: {
        type: String,
      },
      stakingVelocity: {
        type: String,
      },
      // future-safe: allow more encrypted inputs
      // volatility: String,
      // moderationScore: String,
    },

    // -------------------------
    // Plaintext Scores (Legacy / Hybrid)
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
    // IPFS anchoring (B + E)
    // -------------------------
    ipfsCID: String,
    hash: String,

    // -------------------------
    // Cooldown tracking
    // -------------------------
    lastInfluenceUpdate: Date,
    lastTrustUpdate: Date,

    // -------------------------
    // Epoch / Versioning
    // -------------------------
    epoch: {
      type: Number,
      default: 0,
    },

    // -------------------------
    // Historical Scores
    // -------------------------
    history: {
      type: [ReputationHistorySchema],
      default: [],
    },
  },
  { timestamps: true }
);

// -------------------------
// SAFE async pre-save hook
// -------------------------
ReputationSchema.pre("save", async function () {
  if (this.history.length > 50) {
    this.history = this.history.slice(-50);
  }
});

export default mongoose.model("Reputation", ReputationSchema);
