import { FastifyInstance, RouteOptions } from "fastify";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import * as tribesModel from "../models/tribes.model";
import { IdParamsSchema, IdParamsType } from "./schemas";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/tribes/:id",
    schema: {
      params: IdParamsSchema,
    },
    handler: async (request, reply) => {
      const params = request.params as IdParamsType;
      try{
        const tribe = await tribesModel.getTribe(fastify, params.id);
        reply.code(200).send(tribe);
      }catch(error){
        if (error instanceof ResourceNotFoundError) {
          reply.code(404).send({ error: error.message });
        } else {
          reply.code(500).send({ error: (error as Error).message });
        }
      }

    },
  };
}