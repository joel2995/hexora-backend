import express from "express";
import AllowanceVoucher from "../models/AllowanceVoucher.model.js";

const router = express.Router();

/**
 * Creator submits signed allowance voucher
 */
router.post("/issue", async (req, res) => {
  try {
    const { owner, delegate, scope, expiresAt, signature } = req.body;

    if (!owner || !delegate || !scope || !expiresAt || !signature) {
      return res.status(400).json({ error: "Invalid voucher payload" });
    }

    const voucher = await AllowanceVoucher.create({
      owner: owner.toLowerCase(),
      delegate: delegate.toLowerCase(),
      scope,
      expiresAt,
      signature,
    });

    res.json({ ok: true, voucherId: voucher._id });
  } catch (err) {
    console.error("[ALLOWANCE ISSUE ERROR]", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;