import mongoose from "mongoose";

const ReputationSchema = new mongoose.Schema({
  wallet: { type: String, required: true },

  influenceScore: Number,
  trustScore: Number,

  ipfsCID: String,
  hash: String,

  lastInfluenceUpdate: Date,
  lastTrustUpdate: Date,

  history: [
    {
      influenceScore: Number,
      trustScore: Number,
      timestamp: Date
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Reputation", ReputationSchema);