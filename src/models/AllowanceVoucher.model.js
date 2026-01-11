import mongoose from "mongoose";

const AllowanceVoucherSchema = new mongoose.Schema(
  {
    owner: { type: String, required: true, index: true },      // creator
    delegate: { type: String, required: true, index: true },   // brand
    scope: { type: [String], required: true },                 // permissions
    expiresAt: { type: Number, required: true },
    signature: { type: String, required: true },
    revoked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("AllowanceVoucher", AllowanceVoucherSchema);