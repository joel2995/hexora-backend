import mongoose from "mongoose";

const ReputationSignalSchema = new mongoose.Schema(
  {
    wallet: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    encryptedInfluence: String,
    encryptedTrust: String,

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    finalized: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "ReputationSignal",
  ReputationSignalSchema
);
