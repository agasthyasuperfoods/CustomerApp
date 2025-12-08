import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { users } from "@/lib/passkeyStore";

/* ✅ FINAL SAFE BUFFER NORMALIZER (VERCEL SAFE) */
function toBuffer(value) {
  try {
    if (!value) return null;

    // ✅ Native
    if (Buffer.isBuffer(value)) return value;
    if (value instanceof Uint8Array) return Buffer.from(value);
    if (value instanceof ArrayBuffer) return Buffer.from(value);

    // ✅ Node { type: "Buffer", data: [...] }
    if (typeof value === "object" && value.type === "Buffer" && Array.isArray(value.data)) {
      return Buffer.from(value.data);
    }

    // ✅ Redis / JSON { data: [...] }
    if (typeof value === "object" && Array.isArray(value.data)) {
      return Buffer.from(value.data);
    }

    // ✅ base64 / base64url string
    if (typeof value === "string") {
      const padding = "=".repeat((4 - (value.length % 4)) % 4);
      const base64 = (value + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      return Buffer.from(base64, "base64");
    }

    // ✅ LAST RESORT — stringify ANY object safely
    return Buffer.from(JSON.stringify(value), "utf8");

  } catch (e) {
    console.error("toBuffer FAILED on value:", value);
    return null; // ✅ NEVER crash production
  }
}


/* ✅ FINAL LOGIN VERIFY */
export default async function handler(req, res) {
  try {
    const body = req.body;
    const { phone } = body;

    let user = phone ? await users.get(phone) : null;

    /* ✅ FALLBACK FIND USER BY CHALLENGE */
    if (!user) {
      const clientDataBuf = toBuffer(body?.response?.clientDataJSON);
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

    /* ✅ FIND AUTHENTICATOR */
    const authenticatorRaw = user.passkeys.find(
      (pk) => pk.credentialID === body.rawId || pk.credentialID === body.id
    );

    if (!authenticatorRaw) {
      return res.status(400).json({
        verified: false,
        error: "Authenticator not found",
      });
    }

    /* ✅ RAW PUBLIC KEY BUFFER (CRITICAL) */
    const authenticator = {
      credentialID: authenticatorRaw.credentialID,
      publicKey: toBuffer(authenticatorRaw.publicKey),
      counter: authenticatorRaw.counter,
    };

    /* ✅ NORMALIZE CHALLENGE */
    let expectedChallenge = user.currentChallenge;
    if (Buffer.isBuffer(expectedChallenge)) {
      expectedChallenge = expectedChallenge
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    /* ✅ FINAL VERIFY CALL */
    const verification = await verifyAuthenticationResponse({
      response: {
        id: body.id,
        rawId: body.rawId,
        type: body.type,
        response: {
          authenticatorData: toBuffer(body.response.authenticatorData),
          clientDataJSON: toBuffer(body.response.clientDataJSON),
          signature: toBuffer(body.response.signature),
          userHandle: body.response.userHandle
            ? toBuffer(body.response.userHandle)
            : null,
        },
      },
      expectedChallenge,
      expectedOrigin: process.env.NEXT_PUBLIC_ORIGIN,
      expectedRPID: process.env.NEXT_PUBLIC_DOMAIN,
      credential: authenticator,
    });

    return res.status(200).json({ verified: verification.verified });

  } catch (err) {
    console.error("❌ LOGIN VERIFY CRASH:", err);
    return res.status(400).json({
      verified: false,
      error: err.message,
    });
  }
}
