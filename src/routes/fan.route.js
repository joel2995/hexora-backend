import express from "express";
import Creator from "../models/Creator.model.js";

const router = express.Router();

router.get("/creators", async (_, res) => {
  const creators = await Creator.find({ isActive: true });
  res.json(creators);
});

export default router;
