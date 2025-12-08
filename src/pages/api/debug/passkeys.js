import { users } from '@/lib/passkeyStore';

function previewPublicKey(pk) {
  if (!pk) return null;
  if (typeof pk === 'string') return pk.slice(0, 40);
  if (Array.isArray(pk)) return `[Array:${pk.length}]`;
  if (pk && pk.type) return pk.type;
  try { return String(pk).slice(0,40); } catch (e) { return null; }
}

export default async function handler(req, res) {
  try {
    const keys = await users.keys();
    const out = {};
    for (const k of keys) {
      const u = await users.get(k);
      out[k] = {
        id: u?.id || null,
        phone: u?.phone || null,
        currentChallengeType: u?.currentChallenge ? typeof u.currentChallenge : null,
        passkeys: (u?.passkeys || []).map(pk => ({
          credentialID: pk.credentialID,
          publicKeyType: pk.publicKey ? typeof pk.publicKey : null,
          publicKeyPreview: previewPublicKey(pk.publicKey),
          counter: pk.counter,
        }))
      };
    }
    res.status(200).json({ keys: keys.length, data: out });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
