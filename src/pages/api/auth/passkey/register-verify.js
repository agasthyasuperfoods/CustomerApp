import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { users } from "@/lib/passkeyStore";

/* -------------------- BASE64URL TO BUFFER -------------------- */
function base64urlToBuffer(base64url) {
  const padding = "=".repeat((4 - (base64url.length % 4)) % 4);
  const base64 = (base64url + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  return Buffer.from(base64, "base64");
}

/* -------------------- REGISTER VERIFY -------------------- */
export default async function handler(req, res) {
  try {
    const { phone } = req.body;
    let user = phone ? await users.get(phone) : null;

    if (!user || !user.currentChallenge) {
      return res.status(400).json({
        verified: false,
        error: "User or challenge not found",
      });
    }

    /* ---------- NORMALIZE EXPECTED CHALLENGE ---------- */
    let expectedChallenge = user.currentChallenge;
    if (Buffer.isBuffer(expectedChallenge)) {
      expectedChallenge = expectedChallenge
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    /* ---------- VERIFY REGISTRATION ---------- */
    let verification;
    try {
      verification = await verifyRegistrationResponse({
        response: req.body,
        expectedChallenge,
        expectedOrigin: process.env.NEXT_PUBLIC_ORIGIN,
        expectedRPID: process.env.NEXT_PUBLIC_DOMAIN,
      });
    } catch (err) {
      console.error("❌ REGISTER VERIFY ERROR:", err);
      return res.status(400).json({
        verified: false,
        error: err.message,
      });
    }

    const { verified, registrationInfo } = verification;

    if (!verified || !registrationInfo) {
      return res.status(400).json({ verified: false });
    }

    /* ---------- STORE RAW CBOR KEY (CRITICAL FIX) ---------- */
    const cred = registrationInfo.credential;

    if (!Array.isArray(user.passkeys)) user.passkeys = [];

    user.passkeys.push({
      credentialID: cred.id,
      publicKey: Buffer.from(cred.publicKey), // ✅ RAW BUFFER ONLY
      counter: cred.counter,
    });

    await users.set(phone, user);

    console.log("✅ REGISTER SUCCESS:", cred.id);

    return res.status(200).json({ verified: true });
  } catch (err) {
    console.error("❌ REGISTER CRASH:", err);
    return res.status(400).json({
      verified: false,
      error: err.message,
    });
  }
}
