import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { users } from "@/lib/passkeyStore";

/* ✅ FORCE ANY INPUT → BASE64URL STRING ONLY */
function toBase64URL(value) {
  if (!value) return null;

  if (typeof value === "string") return value;

  if (Buffer.isBuffer(value)) {
    return value.toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  if (value instanceof Uint8Array || value instanceof ArrayBuffer) {
    return Buffer.from(value).toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  if (value?.type === "Buffer" && Array.isArray(value.data)) {
    return Buffer.from(value.data).toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  return Buffer.from(JSON.stringify(value)).toString("base64")
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
      const clientDataRaw = toBase64URL(body?.response?.clientDataJSON);
      const parsed = JSON.parse(
        Buffer.from(clientDataRaw.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()
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
      return res.status(400).json({
        verified: false,
        error: "Authenticator not found",
      });
    }

    /* ✅ STORED KEY MUST BE RAW BUFFER */
    const authenticator = {
      credentialID: authenticatorRaw.credentialID,
      publicKey: Buffer.isBuffer(authenticatorRaw.publicKey)
        ? authenticatorRaw.publicKey
        : Buffer.from(authenticatorRaw.publicKey.data || []),
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

    /* ✅ ✅ ✅ FINAL VERIFY → ALL INPUTS MUST BE STRINGS ✅ ✅ ✅ */
    const verification = await verifyAuthenticationResponse({
      response: {
        id: body.id,
        rawId: body.rawId,
        type: body.type,
        response: {
          authenticatorData: toBase64URL(body.response.authenticatorData),
          clientDataJSON: toBase64URL(body.response.clientDataJSON), // ✅ THIS FIXES YOUR ERROR
          signature: toBase64URL(body.response.signature),
          userHandle: body.response.userHandle
            ? toBase64URL(body.response.userHandle)
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
    return res.status(400).json({
      verified: false,
      error: err.message,
    });
  }
}
