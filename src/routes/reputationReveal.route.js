import express from "express"
import Reputation from "../models/Reputation.model.js"

const router = express.Router()

router.post("/reveal", async (req, res) => {
  try {
    console.log("🟡 REVEAL HIT")
    console.log("BODY =", req.body)

    const {
      wallet,
      field,
      plaintext,
      proof,
      attestedBy,
      timestamp,
    } = req.body

    if (
      !wallet ||
      !field ||
      plaintext === undefined ||
      typeof proof !== "string"
    ) {
      console.error("❌ INVALID PAYLOAD")
      return res.status(400).json({
        error: "Invalid reveal payload",
        received: req.body,
      })
    }

    await Reputation.findOneAndUpdate(
      { wallet: wallet.toLowerCase() },
      {
        $set: {
          [`revealed.${field}`]: {
            value: plaintext,
            proof,
            attestedBy,
            timestamp,
          },
        },
      },
      { upsert: true }
    )

    console.log("🔓 ATTESTED REVEAL STORED:", {
      wallet,
      field,
      plaintext,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error("[ATTESTED REVEAL ERROR]", err)
    res.status(500).json({ error: "Internal server error" })
  }
})
export default router