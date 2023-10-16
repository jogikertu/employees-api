import { FastifyInstance, RouteOptions } from "fastify";
import * as tribesModel from "../models/tribes.model";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/tribes",
    handler: async (request, reply) => {
      const tribes = await tribesModel.getTribes(fastify);
      reply.code(200).send(tribes);
    },
  };
}