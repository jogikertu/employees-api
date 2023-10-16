import { FastifyInstance, RouteOptions } from "fastify";
import * as reportsModel from "../models/reports.model";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/employees/report",
    handler: async (request, reply) => {
      const reports = await reportsModel.getReportsEmployees(fastify);
      reply.code(200).send(reports);
    },
  };
}