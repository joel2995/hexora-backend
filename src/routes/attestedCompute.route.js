import express from "express";
import { attestedCompute } from "../services/inco/attestedCompute.service.js";

const router = express.Router();

/**
 * POST /attested/compute
 * Example:
 * Is encryptedTrustScore >= 70 ?
 */
router.post("/compute", async (req, res) => {
  try {
    const {
      encryptedValue,
      operator,
      threshold,
      requester,
    } = req.body;

    if (!encryptedValue || !operator || threshold === undefined) {
      return res.status(400).json({
        error: "Invalid payload",
        expected: ["encryptedValue", "operator", "threshold"],
      });
    }

    const result = await attestedCompute({
      encryptedValue,
      operator,
      threshold,
      requester,
    });

    res.json(result);
  } catch (err) {
    console.error("[ATTESTED COMPUTE ERROR]", err);
    res.status(500).json({ error: "Attested compute failed" });
  }
});

export default router;