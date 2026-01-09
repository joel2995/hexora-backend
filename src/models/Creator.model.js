import mongoose from "mongoose";

const CreatorSchema = new mongoose.Schema(
  {
    wallet: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    creatorToken: {
      type: String, // ERC20 address
      index: true,
    },

    ipfsCID: {
      type: String,
    },

    reputationRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reputation",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Creator", CreatorSchema);
