import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { users } from "@/lib/passkeyStore";

/* -------------------- SAFE BUFFER CONVERTER -------------------- */
function toBuffer(value) {
  if (!value) return null;

  if (Buffer.isBuffer(value)) return value;
  if (value instanceof Uint8Array) return Buffer.from(value);

  // Handle Node's { type: 'Buffer', data: [...] } representation and
  // other array-like .data containers
  if (value && typeof value === "object") {
    if (ArrayBuffer.isView(value)) {
      // DataView / TypedArray
      return Buffer.from(value.buffer, value.byteOffset || 0, value.byteLength || value.length);
    }
    if (value instanceof ArrayBuffer) {
      return Buffer.from(value);
    }
    if (value.type === "Buffer" && Array.isArray(value.data)) {
      return Buffer.from(value.data);
    }
    if (value.data && Array.isArray(value.data)) {
      return Buffer.from(value.data);
    }
  }

  if (typeof value === "string") {
    const padding = "=".repeat((4 - (value.length % 4)) % 4);
    const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(base64, "base64");
  }

  // As a last resort, if it's an object, stringify it and convert.
  if (value && typeof value === "object") {
    try {
      const s = JSON.stringify(value);
      return Buffer.from(s, "utf8");
    } catch (e) {
      // fallthrough to error
    }
  }

  throw new Error("Invalid buffer input received");
}

/* -------------------- LOGIN VERIFY -------------------- */
export default async function handler(req, res) {
  try {
    const body = req.body;
    const { phone } = body;

    let user = phone ? await users.get(phone) : undefined;

    /* ---------- FALLBACK FIND USER BY CHALLENGE ---------- */
    if (!user) {
      try {
        const clientDataBuf = toBuffer(body?.response?.clientDataJSON);
        const parsed = JSON.parse(clientDataBuf.toString("utf8"));
        const clientChallenge = parsed.challenge;

        const keys = await users.keys();
        for (const k of keys) {
          const u = await users.get(k);
          if (u?.currentChallenge === clientChallenge) {
            user = u;
            console.log("LOGIN VERIFY: found user by challenge", k);
            break;
          }
        }
      } catch {}
    }

    if (!user) {
      return res.status(400).json({ verified: false, error: "User not found" });
    }

    if (!Array.isArray(user.passkeys)) user.passkeys = [];

    /* ---------- FIND AUTHENTICATOR ---------- */
    const authenticatorRaw = user.passkeys.find(
      (pk) => pk.credentialID === body.rawId || pk.credentialID === body.id
    );

    if (!authenticatorRaw) {
      return res.status(400).json({ verified: false, error: "Authenticator not found" });
    }

    /* ---------- REHYDRATE AUTHENTICATOR ---------- */
    const authenticator = {
      id: authenticatorRaw.credentialID,
      publicKey: toBuffer(authenticatorRaw.publicKey), 
      counter: authenticatorRaw.counter,
    };

    /* ---------- GET EXPECTED CHALLENGE ---------- */
    let expectedChallenge = user.currentChallenge;
    if (Buffer.isBuffer(expectedChallenge)) {
      expectedChallenge = expectedChallenge
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    const clientDataBuf = toBuffer(body.response.clientDataJSON);
    const parsedClient = JSON.parse(clientDataBuf.toString("utf8"));

    console.log(
      "LOGIN VERIFY:",
      parsedClient.challenge,
      " expected:",
      expectedChallenge
    );

    /* ---------- VERIFY AUTH ---------- */
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
    console.error("LOGIN VERIFY ERROR:", err);
    return res.status(400).json({ verified: false, error: err.message });
  }
}
