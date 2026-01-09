import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  wallet: { type: String, unique: true },
  firstSeenAt: { type: Date, default: Date.now },
  lastSeenAt: Date
});

export default mongoose.model("User", UserSchema);
