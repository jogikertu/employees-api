import Fastify, { FastifyInstance } from "fastify";
import app from "./app";

async function startServer() {
  const fastify: FastifyInstance = Fastify();

  await app(fastify);

  fastify
    .listen({ host: "0.0.0.0", port: 3000 })
    .then(() => {
      console.log(`✅ Server is running`);
    })
    .catch((error: Error) => {
      console.log(`🫡 Server is expiriencing L`);
      console.log(`Reason: ${error}`);
      process.exit(1);
    });
}

startServer();
