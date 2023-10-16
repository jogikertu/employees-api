import { FastifyInstance, RouteOptions } from "fastify";
import * as employeesModel from "../models/employees.model";
import { searchEmployeeBody, searchType } from "./schemas";


export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "GET",
    url: "/api/employees",
    schema: {
      querystring: searchEmployeeBody
    },
    handler: async (request, reply) => {
      const query = request.query as searchType;
      try {
        const employees = await employeesModel.getEmployees(
          fastify,
          query
        );
        reply.code(200).send(employees);
      } catch (error) {
        reply.code(500).send({ error: (error as Error).message });
      }
    },
  };
}
