import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { users } from "@/lib/passkeyStore";

/* -------------------- SAFE BUFFER NORMALIZER -------------------- */
function toBuffer(value) {
  if (!value) return null;
  if (Buffer.isBuffer(value)) return value;
  if (value instanceof Uint8Array) return Buffer.from(value);
  if (typeof value === "string") {
    const padding = "=".repeat((4 - (value.length % 4)) % 4);
    const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(base64, "base64");
  }
  if (value?.data && Array.isArray(value.data)) {
    return Buffer.from(value.data);
  }
  throw new Error("Invalid buffer input");
}

/* -------------------- LOGIN VERIFY -------------------- */
export default async function handler(req, res) {
  try {
    const body = req.body;
    const { phone } = body;

    let user = phone ? await users.get(phone) : null;

    /* ---------- FALLBACK BY CHALLENGE ---------- */
    if (!user) {
      const clientDataBuf = toBuffer(body.response.clientDataJSON);
      const parsed = JSON.parse(clientDataBuf.toString("utf8"));
      const challenge = parsed.challenge;

      const keys = await users.keys();
      for (const k of keys) {
        const u = await users.get(k);
        if (u?.currentChallenge === challenge) {
          user = u;
          break;
        }
      }
    }

    if (!user) {
      return res.status(400).json({ verified: false, error: "User not found" });
    }

    /* ---------- FIND AUTHENTICATOR ---------- */
    const authenticatorRaw = user.passkeys.find(
      (pk) => pk.credentialID === body.rawId || pk.credentialID === body.id
    );

    if (!authenticatorRaw) {
      return res
        .status(400)
        .json({ verified: false, error: "Authenticator not found" });
    }

    /* ---------- RAW CBOR PUBLIC KEY (CRITICAL FIX) ---------- */
    const authenticator = {
      credentialID: authenticatorRaw.credentialID,
      publicKey: Buffer.from(authenticatorRaw.publicKey), // ✅ RAW BUFFER
      counter: authenticatorRaw.counter,
    };

    /* ---------- NORMALIZE EXPECTED CHALLENGE ---------- */
    let expectedChallenge = user.currentChallenge;
    if (Buffer.isBuffer(expectedChallenge)) {
      expectedChallenge = expectedChallenge
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    /* ---------- VERIFY AUTH ---------- */
    let verification;
    try {
      verification = await verifyAuthenticationResponse({
        response: {
          id: body.id,
          rawId: body.rawId,
          type: body.type,
          response: {
            authenticatorData: body.response.authenticatorData,
            clientDataJSON: body.response.clientDataJSON,
            signature: body.response.signature,
            userHandle: body.response.userHandle || null,
          },
        },
        expectedChallenge,
        expectedOrigin: process.env.NEXT_PUBLIC_ORIGIN,
        expectedRPID: process.env.NEXT_PUBLIC_DOMAIN,
        credential: authenticator,
      });
    } catch (err) {
      console.error("❌ LOGIN VERIFY ERROR:", err);
      return res.status(400).json({
        verified: false,
        error: err.message,
      });
    }

    return res.status(200).json({ verified: verification.verified });
  } catch (err) {
    console.error("❌ LOGIN VERIFY CRASH:", err);
    return res.status(400).json({
      verified: false,
      error: err.message,
    });
  }
}
