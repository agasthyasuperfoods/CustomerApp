import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { users } from "@/lib/passkeyStore";

function base64urlToBuffer(base64url) {
  const padding = "=".repeat((4 - (base64url.length % 4)) % 4);
  const base64 = (base64url + padding).replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64");
}

export default async function handler(req, res) {
  try {
    const body = req.body;
    const { phone } = body;

  let user = phone ? await users.get(phone) : undefined;

    // If phone not provided or user not found, try to find the user by the
    // challenge embedded in clientDataJSON (helps when client doesn't send phone)
    if (!user) {
      try {
        const clientDataB64 = body?.response?.clientDataJSON;
        if (clientDataB64) {
          const clientDataBuf = base64urlToBuffer(clientDataB64);
          const clientData = JSON.parse(clientDataBuf.toString("utf8"));
          const clientChallenge = clientData.challenge;
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

          // iterate keys from async store and fetch each user
          const storedKeys = (await users.keys()) || [];
          for (const k of storedKeys) {
            const u = await users.get(k);
            const stored = normalize(u && u.currentChallenge);
            if (stored && stored === clientChallenge) {
              user = u;
              console.log("LOGIN VERIFY: found user by challenge for phone:", (u && u.phone) || k);
              break;
            }
          }
        }
      } catch (e) {
        console.error("LOGIN VERIFY: could not parse clientDataJSON when searching user by challenge:", e?.message || e);
      }
    }

    if (!user) {
      console.error('LOGIN VERIFY: user not found for phone', phone);
      return res.status(400).json({ verified: false, error: 'User not found' });
    }

    if (!Array.isArray(user.passkeys)) user.passkeys = [];

   const authenticatorRaw = user.passkeys.find(
  pk => pk.credentialID === body.rawId || pk.credentialID === body.id
);

if (!authenticatorRaw) {
  console.error('LOGIN VERIFY: authenticator not found for rawId', body.rawId || body.id);
  return res.status(400).json({ verified: false, error: 'Authenticator not found' });
}

// ✅ CRITICAL: Rehydrate publicKey into a Buffer (Redis breaks this)
const authenticator = {
  id: authenticatorRaw.credentialID,
  publicKey: Buffer.from(authenticatorRaw.publicKey.data || authenticatorRaw.publicKey),
  counter: authenticatorRaw.counter,
};


    if (!authenticator) {
      console.error('LOGIN VERIFY: authenticator not found for rawId', body.rawId || body.id);
      return res.status(400).json({ verified: false, error: 'Authenticator not found' });
    }

    // Ensure we have a stored challenge to compare against. If missing,
    // attempt to find the correct user by the credential id (rawId) as a
    // fallback — helpful when phone keys or lookups are mismatched.
    if (!user.currentChallenge && user.currentChallenge !== "") {
      console.warn('LOGIN VERIFY: no stored challenge for user', user.phone || 'unknown');

      // Try to find a user by matching the credentialID across all users
      const credentialId = body.rawId || body.id;
      if (credentialId) {
        // use helper to find by credential id
        const found = await users.findByCredentialId(credentialId);
        if (found) {
          user = found.user;
          console.log('LOGIN VERIFY: found user by credential id under phone', found.phone);
        }
      }

      if (!user.currentChallenge && user.currentChallenge !== "") {
        console.error('LOGIN VERIFY: still no stored challenge after fallback lookup for user', user.phone || 'unknown');
        return res.status(400).json({ verified: false, error: 'No stored challenge' });
      }
    }

    // Determine expectedChallenge. Prefer stored server-side challenge,
    // but if missing use the client's clientDataJSON.challenge as a last-
    // resort fallback (useful for dev/debugging). Log a warning when we do.
    let expectedChallenge;
    if (user.currentChallenge || user.currentChallenge === "") {
      expectedChallenge = user.currentChallenge;
      if (Buffer.isBuffer(user.currentChallenge) || user.currentChallenge instanceof Uint8Array) {
        const buf = Buffer.from(user.currentChallenge);
        expectedChallenge = buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }
    } else {
      // Fallback: parse clientDataJSON from the request to extract challenge
      try {
        const clientDataB64 = body?.response?.clientDataJSON;
        if (clientDataB64) {
          const buf = base64urlToBuffer(clientDataB64);
          const parsed = JSON.parse(buf.toString('utf8'));
          expectedChallenge = parsed.challenge;
          console.warn('LOGIN VERIFY: using client-sent challenge as expectedChallenge (fallback)');
        }
      } catch (e) {
        console.error('LOGIN VERIFY: could not parse clientDataJSON for fallback expectedChallenge', e?.message || e);
      }
    }

  // Log both challenges for easier debugging if verification fails
    try {
      const clientDataB64 = body?.response?.clientDataJSON;
      let clientChallenge = '(no clientDataJSON)';
      if (clientDataB64) {
        try {
          const buf = base64urlToBuffer(clientDataB64);
          const parsed = JSON.parse(buf.toString('utf8'));
          clientChallenge = parsed.challenge;
        } catch (e) {
          clientChallenge = '(could not parse clientDataJSON)';
        }
      }
      console.log('LOGIN VERIFY: clientChallenge=', clientChallenge, ' expectedChallenge=', expectedChallenge);
    } catch (e) {
      console.error('LOGIN VERIFY: error logging challenges', e);
    }

  const verification = await verifyAuthenticationResponse({
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


    res.status(200).json({ verified: verification.verified });
  } catch (err) {
    console.error("LOGIN VERIFY ERROR:", err);
    res.status(400).json({ verified: false });
  }
}
