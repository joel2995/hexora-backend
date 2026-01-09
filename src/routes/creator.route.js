import express from "express";
import Creator from "../models/Creator.model.js";
import Reputation from "../models/Reputation.model.js";

const router = express.Router();

router.get("/dashboard/:wallet", async (req, res) => {
  const creator = await Creator.findOne({ wallet: req.params.wallet });
  const reputation = await Reputation.findOne({ wallet: req.params.wallet });

  res.json({ creator, reputation });
});

export default router;
