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

    const options = await generateRegistrationOptions({
      rpName: "Agasthya Nutromilk", 
      rpID: process.env.NEXT_PUBLIC_DOMAIN, 
      userID: userIDBuffer,
      userName: phone,
      timeout: 60000,
      attestationType: "none",
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "required",
      },
    });

    console.log("REGISTER CHALLENGE: generated options.challenge=", options.challenge);

    user.currentChallenge = options.challenge;
    await users.set(phone, user);

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
