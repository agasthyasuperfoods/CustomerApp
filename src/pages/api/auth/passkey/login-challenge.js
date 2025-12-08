import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { users } from "@/lib/passkeyStore";

export default async function handler(req, res) {
  try {
    const { phone } = req.body;

    const user = await users.get(phone);

    if (!user || !Array.isArray(user.passkeys) || user.passkeys.length === 0) {
      return res.status(400).json({ error: "No Face ID Registered" });
    }

  const options = await generateAuthenticationOptions({
      timeout: 60000,
      allowCredentials: user.passkeys.map(pk => ({
        id: pk.credentialID,
        type: "public-key",
      })),
      userVerification: "required",
    });

    // Diagnostic logs to debug missing challenge issues
    try {
      console.log('LOGIN CHALLENGE: users.size=', await users.size());
      console.log('LOGIN CHALLENGE: user before set =', JSON.parse(JSON.stringify(user)));
    } catch (e) {
      console.log('LOGIN CHALLENGE: could not stringify user for debug', e?.message || e);
    }
    console.log('LOGIN CHALLENGE: generated options.challenge=', options.challenge);

    user.currentChallenge = options.challenge;
    await users.set(phone, user);

    try {
      console.log('LOGIN CHALLENGE: user after set =', JSON.parse(JSON.stringify(user)));
    } catch (e) {}

    res.status(200).json(options);
  } catch (err) {
    console.error("LOGIN CHALLENGE ERROR:", err);
    res.status(500).json({ error: "Login challenge failed" });
  }
}
