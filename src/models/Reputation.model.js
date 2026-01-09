import mongoose from "mongoose";

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

const ReputationSchema = new mongoose.Schema(
  {
    wallet: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    // Current finalized scores
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

    // IPFS anchoring
    ipfsCID: String,
    hash: String,

    // Cooldown tracking
    lastInfluenceUpdate: Date,
    lastTrustUpdate: Date,

    // Versioning / epoch
    epoch: {
      type: Number,
      default: 0,
    },

    // History (bounded)
    history: {
      type: [ReputationHistorySchema],
      default: [],
    },
  },
  { timestamps: true }
);

// ✅ SAFE async pre-save hook (NO next)
ReputationSchema.pre("save", async function () {
  if (this.history.length > 50) {
    this.history = this.history.slice(-50);
  }
});

export default mongoose.model("Reputation", ReputationSchema);
