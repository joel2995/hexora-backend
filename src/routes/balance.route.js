import express from "express";
import { getERC20Balance } from "../services/blockchain/readBalance.service.js";

const router = express.Router();

router.get("/:token/:wallet", async (req, res) => {
  const { token, wallet } = req.params;

  const balance = await getERC20Balance({
    tokenAddress: token,
    wallet,
  });

  res.json(balance);
});

export default router;
