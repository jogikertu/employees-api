import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import * as Redis from "redis";
import * as RedisMock from "redis-mock";

type envType = "development" | "production" | "test";
const env = (process.env.ENVIRONMENT as envType) ?? "development";
const redisHost = process.env.REDIS_HOST ?? "localhost";


async function redisPlugin(fastify: FastifyInstance) {
    if (env === "test") {
        const redis = RedisMock.createClient();
        fastify.decorate("cache", redis);
        console.log(`📝 Redis-mock connected\n`);
    
        return;
      }
  const url = `redis://${redisHost}:6379`;

  console.log(`connecting to redis via ${url}`);

  const redis = Redis.createClient({ url });
  redis.connect();

  console.log(`Redis connected`);

  fastify.decorate("cache", redis);

  fastify.addHook('onClose', (fastify: FastifyInstance, done) => {
    fastify.cache.disconnect();
    done();
  });
} 

export default fp(redisPlugin, {
  name: "cache",
});

declare module "fastify" {
  interface FastifyInstance {
    cache: ReturnType<typeof Redis.createClient>;
  }
}