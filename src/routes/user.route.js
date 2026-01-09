import express from "express";
import { detectRole } from "../services/role.service.js";

const router = express.Router();

router.get("/role/:wallet", async (req, res) => {
  const role = await detectRole(req.params.wallet);
  res.json(role);
});

export default router;
