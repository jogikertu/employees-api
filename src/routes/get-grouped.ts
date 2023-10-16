import { FastifyInstance, RouteOptions } from "fastify";
import * as employeesModel from "../models/employees.model";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/employees/Report",
    handler: async (request, reply) => {
      const employees = await employeesModel.getGrouped(fastify);
      reply.code(200).send(employees);
    },
  };
}