import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { users } from "@/lib/passkeyStore";

/* ✅ FORCE ANY INPUT → BASE64URL STRING */
function toBase64Url(value) {
  if (!value) return null;

  // Already correct
  if (typeof value === "string") return value;

  // Buffer
  if (Buffer.isBuffer(value)) {
    return value
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  // Uint8Array / ArrayBuffer
  if (value instanceof Uint8Array || value instanceof ArrayBuffer) {
    return Buffer.from(value)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  // Redis JSON { type:'Buffer', data:[...] }
  if (value?.type === "Buffer" && Array.isArray(value.data)) {
    return Buffer.from(value.data)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  // LAST RESORT
  return Buffer.from(JSON.stringify(value))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default async function handler(req, res) {
  try {
    const body = req.body;
    const { phone } = body;

    let user = phone ? await users.get(phone) : null;

    /* ✅ FALLBACK FIND USER BY CHALLENGE */
    if (!user) {
      const clientDataJSON = toBase64Url(body?.response?.clientDataJSON);
      const parsed = JSON.parse(
        Buffer.from(clientDataJSON.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()
      );

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
      return res.status(400).json({ verified: false, error: "Authenticator not found" });
    }

    const authenticator = {
      credentialID: authenticatorRaw.credentialID,
      publicKey: authenticatorRaw.publicKey, // ✅ MUST already be base64url
      counter: authenticatorRaw.counter,
    };

    /* ✅ NORMALIZE EXPECTED CHALLENGE */
    let expectedChallenge = user.currentChallenge;
    if (Buffer.isBuffer(expectedChallenge)) {
      expectedChallenge = expectedChallenge
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    /* ✅ ✅ ✅ FINAL VERIFY (ALL BASE64URL STRINGS) ✅ ✅ ✅ */
    const verification = await verifyAuthenticationResponse({
      response: {
        id: body.id,
        rawId: body.rawId,
        type: body.type,
        response: {
          authenticatorData: toBase64Url(body.response.authenticatorData),
          clientDataJSON: toBase64Url(body.response.clientDataJSON),
          signature: toBase64Url(body.response.signature),
          userHandle: body.response.userHandle
            ? toBase64Url(body.response.userHandle)
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
    console.error("❌ LOGIN VERIFY FINAL CRASH:", err);
    return res.status(400).json({ verified: false, error: err.message });
  }
}
