import mongoose from "mongoose";

const AllowanceVoucherSchema = new mongoose.Schema(
  {
    owner: { type: String, required: true, lowercase: true },
    delegate: { type: String, required: true, lowercase: true },

    scope: {
      type: [String], // ["trustCheck", "influenceCheck"]
      required: true,
    },

    expiry: { type: Number, required: true },

    signature: { type: String, required: true },

    revoked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("AllowanceVoucher", AllowanceVoucherSchema);