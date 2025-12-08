import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

if (!global._passkeyUsers) {
  global._passkeyUsers = new Map();
}

export const users = {
  async get(phone) {
    if (process.env.NODE_ENV === "development") {
      return global._passkeyUsers.get(phone);
    }

    const data = await redis.get(`user:${phone}`);
    return data ? JSON.parse(data) : null;
  },

  async set(phone, data) {
    if (process.env.NODE_ENV === "development") {
      global._passkeyUsers.set(phone, data);
      return;
    }

    await redis.set(`user:${phone}`, JSON.stringify(data));
  },

  async keys() {
    if (process.env.NODE_ENV === "development") {
      return Array.from(global._passkeyUsers.keys());
    }

    const keys = await redis.keys("user:*");
    return keys.map((k) => k.replace("user:", ""));
  },

  async size() {
    const keys = await this.keys();
    return keys.length;
  },

  async findByCredentialId(credentialID) {
    const keys = await this.keys();

    for (const phone of keys) {
      const user = await this.get(phone);
      if (user?.passkeys?.some((pk) => pk.credentialID === credentialID)) {
        return { phone, user };
      }
    }

    return null;
  },
};
