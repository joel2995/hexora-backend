import mongoose from "mongoose";

const CreatorSchema = new mongoose.Schema({
  wallet: String,
  creatorToken: String,
  ipfsCID: String,
  updatedAt: Date
});

export default mongoose.model("Creator", CreatorSchema);
