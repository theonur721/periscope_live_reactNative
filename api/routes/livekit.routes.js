import express from "express";
import { AccessToken } from "livekit-server-sdk";

const router = express.Router();

router.get("/token", async (req, res) => {
  try {
    const identity = String(req.query.identity || "user_1");
    const room = String(req.query.room || "room_test");
    const role = String(req.query.role || "viewer");

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const livekitUrl = process.env.LIVEKIT_URL;

    if (!apiKey || !apiSecret || !livekitUrl) {
      return res.status(500).json({ message: "LIVEKIT env missing" });
    }

    const at = new AccessToken(apiKey, apiSecret, { identity, name: identity });

    at.addGrant({
      room,
      roomJoin: true,
      canSubscribe: true,
      canPublish: role === "host",
      canPublishData: role === "host",
    });

    const jwt = await at.toJwt();

    if (typeof jwt !== "string" || jwt.length < 50) {
      return res.status(500).json({
        message: "Token string değil / kısa",
        tokenType: typeof jwt,
        tokenLen: jwt?.length,
      });
    }

    // ✅ Server tarafında "https://..." döndür (RN tarafı wss'e çeviriyor)
    const serverUrl = String(livekitUrl).replace(/^wss:\/\//, "https://");

    return res.json({
      url: serverUrl,
      token: jwt,
      room,
      identity,
      role,
    });
  } catch (e) {
    console.error("LIVEKIT TOKEN ERROR:", e);
    return res.status(500).json({ message: e.message || "Token error" });
  }
});

export default router;
