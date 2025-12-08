import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { users } from "@/lib/passkeyStore";

/* ✅ ALWAYS RETURN BASE64URL STRING */
function normalizeChallenge(challenge) {
  if (!challenge) return challenge;

  if (typeof challenge === "string") return challenge;

  if (Buffer.isBuffer(challenge) || challenge instanceof Uint8Array) {
    return Buffer.from(challenge)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  return String(challenge);
}

export default async function handler(req, res) {
  try {
    const { phone } = req.body;
    const user = await users.get(phone);

    if (!user || !user.currentChallenge) {
      return res.status(400).json({
        verified: false,
        error: "User or challenge not found",
      });
    }

    const expectedChallenge = normalizeChallenge(user.currentChallenge);

    const verification = await verifyRegistrationResponse({
      response: req.body,
      expectedChallenge,
      expectedOrigin: process.env.NEXT_PUBLIC_ORIGIN,
      expectedRPID: process.env.NEXT_PUBLIC_DOMAIN,
    });

    if (!verification.verified || !verification.registrationInfo) {
      return res.status(400).json({ verified: false });
    }

    const cred = verification.registrationInfo.credential;

    /* ✅ ✅ ✅ RAW BUFFER STORAGE — THIS IS CORRECT ✅ ✅ ✅ */
    user.passkeys = [
      {
        credentialID: cred.id,
        publicKey: Buffer.from(cred.publicKey), // ✅ KEEP RAW BUFFER
        counter: cred.counter,
      },
    ];

    user.currentChallenge = null;
    await users.set(phone, user);

    return res.status(200).json({ verified: true });

  } catch (err) {
    console.error("❌ REGISTER VERIFY FAILED:", err);
    return res.status(500).json({
      verified: false,
      error: err.message,
    });
  }
}
