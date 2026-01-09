import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    wallet: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["creator", "fan"],
      default: "fan",
    },

    firstSeenAt: {
      type: Date,
      default: Date.now,
    },

    lastSeenAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
