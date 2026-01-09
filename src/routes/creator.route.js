import express from "express";
import Creator from "../models/Creator.model.js";
import Reputation from "../models/Reputation.model.js";

const router = express.Router();

router.get("/dashboard/:wallet", async (req, res) => {
  const wallet = req.params.wallet.toLowerCase();

  const creator = await Creator.findOne({ wallet });
  const reputation = await Reputation.findOne({ wallet });

  res.json({ creator, reputation });
});

export default router;
