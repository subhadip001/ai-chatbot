import Redis from "ioredis"

export const redis = new Redis(process.env.KV_URL as string)