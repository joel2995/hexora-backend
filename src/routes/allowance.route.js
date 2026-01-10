import express from "express";
import AllowanceVoucher from "../models/AllowanceVoucher.model.js";

const router = express.Router();

/**
 * Store a new voucher
 */
router.post("/issue", async (req, res) => {
  const { owner, delegate, scope, expiry, signature } = req.body;

  if (!owner || !delegate || !scope || !expiry || !signature) {
    return res.status(400).json({ error: "Invalid voucher payload" });
  }

  const voucher = await AllowanceVoucher.create({
    owner,
    delegate,
    scope,
    expiry,
    signature,
  });

  res.json({ ok: true, voucher });
});

/**
 * Verify voucher validity
 */
router.post("/verify", async (req, res) => {
  const { owner, delegate, scope } = req.body;

  const voucher = await AllowanceVoucher.findOne({
    owner,
    delegate,
    scope,
    revoked: false,
    expiry: { $gt: Date.now() },
  });

  if (!voucher) {
    return res.status(403).json({ valid: false });
  }

  res.json({ valid: true, voucher });
});

export default router;