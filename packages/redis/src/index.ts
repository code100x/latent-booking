
import { RedisClientType, createClient } from "redis";

export const client: RedisClientType = createClient();

export function getRedisKey(key: string) {
    return `latent:${key}`;
}

export function incrCount(key: string) {
    return client.incr(getRedisKey(key));
}
