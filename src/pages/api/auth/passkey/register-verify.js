import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { users } from "@/lib/passkeyStore";

function base64urlToBuffer(base64url) {
  const padding = "=".repeat((4 - (base64url.length % 4)) % 4);
  const base64 = (base64url + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  return Buffer.from(base64, "base64");
}

// Robust converter for incoming credential fields (rawId, attestationObject, clientDataJSON)
function bufferFromCredentialField(field) {
  // Already a Buffer or Uint8Array
  if (Buffer.isBuffer(field) || field instanceof Uint8Array) {
    return Buffer.from(field);
  }

  // Common case: base64url / base64 / utf8 string
  if (typeof field === "string") {
    // Try base64url first (most likely)
    try {
      return base64urlToBuffer(field);
    } catch (e) {
      // fallthrough
    }

    // Try base64 standard
    try {
      return Buffer.from(field, "base64");
    } catch (e) {
      // fallthrough
    }

    // Try parseable JSON array of bytes (some clients stringify ArrayBuffers)
    try {
      const parsed = JSON.parse(field);
      if (Array.isArray(parsed)) return Buffer.from(parsed);
    } catch (e) {
      // fallthrough
    }

    // Fallback to utf8
    return Buffer.from(field, "utf8");
  }

  // Object form { type: 'Buffer', data: [...] } or Array-like
  if (field && typeof field === "object") {
    if (Array.isArray(field)) return Buffer.from(field);
    if (field.data && Array.isArray(field.data)) return Buffer.from(field.data);
  }

  throw new Error("Unsupported credential field format for conversion to Buffer");
}

export default async function handler(req, res) {
  try {
    console.log("✅ REGISTER VERIFY BODY:", req.body);

    try {
      console.log("users map size at verify:", users.size);
      try { console.log("users keys at verify:", Array.from(users.keys())); } catch (e) {}
    } catch (e) {
      console.log("could not read users map:", e?.message || e);
    }
      try {
        console.log("users map size at verify:", await users.size());
        try { console.log("users keys at verify:", await users.keys()); } catch (e) {}
      } catch (e) {
        console.log("could not read users map:", e?.message || e);
      }

  let { phone } = req.body || {};
  let user = phone ? await users.get(phone) : undefined;

    // If phone not provided or user not found, try to find the user by the
    // challenge embedded in clientDataJSON (helps when client doesn't send phone)
    if (!user) {
      try {
        const clientDataBuf = base64urlToBuffer(req.body.response.clientDataJSON);
        const clientData = JSON.parse(clientDataBuf.toString("utf8"));
        const clientChallenge = clientData.challenge;
        console.log("attempting to find user by client challenge:", clientChallenge);

        // helper to normalize stored challenge to base64url string
        const normalize = (c) => {
          if (!c && c !== "") return undefined;
          if (Buffer.isBuffer(c) || c instanceof Uint8Array) {
            return Buffer.from(c)
              .toString("base64")
              .replace(/\+/g, "-")
              .replace(/\//g, "_")
              .replace(/=+$/, "");
          }
          return String(c);
        };

        // iterate stored user keys from the async store and fetch each user
        const storedKeys = (await users.keys()) || [];
        for (const k of storedKeys) {
          const u = await users.get(k);
          const stored = normalize(u && u.currentChallenge);
          if (stored && stored === clientChallenge) {
            user = u;
            phone = (u && u.phone) || k;
            console.log("found user by challenge for phone:", phone);
            break;
          }
        }
      } catch (e) {
        console.log("could not parse clientDataJSON when searching user by challenge:", e?.message || e);
      }
    }

    if (!user || !user.currentChallenge) {
      return res.status(400).json({
        verified: false,
        error: "User or challenge not found",
      });
    }

    // Debug: show how the challenge is stored and what the client sent
    console.log("stored currentChallenge (raw):", user.currentChallenge);
    if (Buffer.isBuffer(user.currentChallenge)) {
      console.log("stored currentChallenge is Buffer, length:", user.currentChallenge.length);
    } else {
      console.log("stored currentChallenge type:", typeof user.currentChallenge);
    }

    // Try to decode clientDataJSON to inspect the challenge value the browser sent
    try {
      const clientDataBuf = base64urlToBuffer(req.body.response.clientDataJSON);
      const clientData = JSON.parse(clientDataBuf.toString("utf8"));
      console.log("clientData.challenge (from client):", clientData.challenge);
    } catch (e) {
      console.log("could not parse clientDataJSON for debug:", e?.message || e);
    }

    // Normalize expectedChallenge to a base64url string if it was stored as a Buffer
    let expectedChallenge = user.currentChallenge;
    if (Buffer.isBuffer(user.currentChallenge) || user.currentChallenge instanceof Uint8Array) {
      // convert Buffer/Uint8Array -> base64url
      const buf = Buffer.from(user.currentChallenge);
      expectedChallenge = buf
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    console.log("expectedChallenge (used for verify):", expectedChallenge);
    console.log("expectedChallenge type:", typeof expectedChallenge);

    let verification;
    try {
      // Convert incoming credential fields to Buffers for diagnostic logging
      // but send the original base64url strings to the verifier. The
      // verifier expects base64url-encoded strings for `attestationObject`
      // and `clientDataJSON`, and it will convert them internally.
      const rawIdBuf = bufferFromCredentialField(req.body.rawId ?? req.body.id);
      const attestationBuf = bufferFromCredentialField(
        req.body.response && req.body.response.attestationObject
      );
      const clientDataBuf = bufferFromCredentialField(
        req.body.response && req.body.response.clientDataJSON
      );

      console.log("credential.id (string):", req.body.id);
      console.log("rawIdBuf length:", rawIdBuf && rawIdBuf.length);
      console.log("attestationBuf length:", attestationBuf && attestationBuf.length);
      console.log("clientDataBuf length:", clientDataBuf && clientDataBuf.length);

      // Try to parse clientDataJSON for debug when possible
      try {
        const parsed = JSON.parse(
          // clientDataBuf may be a Buffer/Uint8Array; try toString first,
          // otherwise fallback to using the original string if present
          (clientDataBuf && clientDataBuf.toString && clientDataBuf.toString("utf8")) ||
            req.body.response.clientDataJSON
        );
        console.log("parsed clientDataJSON:", parsed);
      } catch (e) {
        console.log("could not parse clientDataJSON (pre-verify):", e?.message || e);
      }

      // Send the original base64url strings to the verifier (id/rawId as
      // strings, and attestation/clientData as base64url strings). This
      // matches the shape expected by @simplewebauthn/server.
     verification = await verifyRegistrationResponse({
  response: req.body,
  expectedChallenge,
  expectedOrigin: "http://localhost:3000",
  expectedRPID: "localhost",
});

    } catch (verifyErr) {
      console.error("❌ verifyRegistrationResponse threw:", verifyErr && (verifyErr.stack || verifyErr));
      return res.status(400).json({
        verified: false,
        error: verifyErr && (verifyErr.message || String(verifyErr)),
        stack: verifyErr && verifyErr.stack ? verifyErr.stack.split('\n').slice(0,5) : undefined,
      });
    }

    if (!verification || verification.verified === false) {
      console.log("verification failed or returned false:", verification);
      return res.status(400).json({ verified: false, info: verification });
    }

    const { verified, registrationInfo } = verification;

    if (verified && registrationInfo) {
      // `registrationInfo.credential` contains id/publicKey/counter per
      // @simplewebauthn/server's return shape
      const cred = registrationInfo.credential || {};
      if (!Array.isArray(user.passkeys)) user.passkeys = [];
      user.passkeys.push({
        credentialID: cred.id,
        publicKey: cred.publicKey,
        counter: cred.counter,
      });
    await users.set(phone, user);
    }

    console.log("✅ REGISTER VERIFY RESULT:", verification);

    return res.status(200).json({ verified });
  } catch (err) {
    console.error("❌ REGISTER VERIFY CRASH:", err);
    return res.status(400).json({
      verified: false,
      error: err.message,
    });
  }
}
