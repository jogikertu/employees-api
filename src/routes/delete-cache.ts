import { FastifyInstance, RouteOptions } from "fastify";
import * as employeesModel from "../models/employees.model";

export default function (fastify: FastifyInstance): RouteOptions {
    return {
      method: "DELETE",
      url: "/cache",
      handler: async (request, reply) => {
        await employeesModel.deleteCache(fastify);
        reply.code(200).send({ success: true });
      },
    };
  }