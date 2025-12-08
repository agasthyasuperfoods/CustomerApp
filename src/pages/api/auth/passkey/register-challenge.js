import { generateRegistrationOptions } from "@simplewebauthn/server";
import { users } from "@/lib/passkeyStore";

export default async function handler(req, res) {
  try {
    console.log("✅ API HIT: /register-challenge");
    console.log("BODY:", req.body);

    const { phone } = req.body || {};

    if (!phone) {
      console.log("❌ PHONE MISSING");
      return res.status(400).json({ error: "Phone missing" });
    }

  let user = await users.get(phone);

    if (!user) {
      user = {
        id: crypto.randomUUID(),
        phone,
        passkeys: [],
        currentChallenge: null,
      };
      await users.set(phone, user);
      console.log("users map updated. size:", await users.size());
      try { console.log("users keys:", await users.keys()); } catch (e) {}
    }

    const userIDBuffer = new TextEncoder().encode(user.id);

    // Ensure we pass a non-string userID (Uint8Array) as required by
    // generateRegistrationOptions. Passing a string causes the helper to
    // throw and results in the client receiving an invalid response.
    const options = await generateRegistrationOptions({
      rpName: "Agasthya Superfoods",
      rpID: "localhost",
      userID: userIDBuffer,
      userName: phone,
      timeout: 60000,
      attestationType: "none",
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "required",
      },
    });


    // Diagnostic logs
    try {
      console.log('REGISTER CHALLENGE: users.size=', users.size);
      console.log('REGISTER CHALLENGE: user before set =', JSON.parse(JSON.stringify(user)));
    } catch (e) {
      console.log('REGISTER CHALLENGE: could not stringify user for debug', e?.message || e);
    }
    console.log('REGISTER CHALLENGE: generated options.challenge=', options.challenge);

    user.currentChallenge = options.challenge;

    // persist the updated user (important for async store)
    try {
      await users.set(phone, user);
    } catch (e) {
      console.log('REGISTER CHALLENGE: failed to persist user:', e?.message || e);
    }

    try {
      console.log('REGISTER CHALLENGE: user after set =', JSON.parse(JSON.stringify(user)));
    } catch (e) {}

    console.log("✅ GENERATED OPTIONS:", options);

    return res.status(200).json(options);
  } catch (err) {
    console.error("❌ REGISTER CHALLENGE CRASH:", err);
    return res.status(500).json({
      error: "Registration challenge failed",
      message: err.message,
    });
  }
}
