import express from "express";
import Reputation from "../models/Reputation.model.js";

const router = express.Router();

router.post("/update", async (req, res) => {
  console.log("RAW BODY =", req.body);
  console.log("wallet =", req.body.wallet);
  console.log("encryptedSignals =", req.body.encryptedSignals);

  const { wallet, encryptedSignals } = req.body;

if (!wallet || !encryptedSignals) {
  return res.status(400).json({
    error: "Invalid payload",
    expected: ["wallet", "encryptedSignals"],
    received: req.body,
  });
}

  res.json({ ok: true });
});


export default router;
