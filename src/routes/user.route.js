import express from "express";
import { detectRole } from "../services/role.service.js";

const router = express.Router();

router.get("/role/:wallet", async (req, res) => {
  const wallet = req.params.wallet.toLowerCase();
  const role = await detectRole(wallet);
  res.json(role);
});

export default router;
