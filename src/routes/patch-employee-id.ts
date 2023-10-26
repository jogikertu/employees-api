import { FastifyInstance, RouteOptions } from "fastify";
import * as employeesModel from "../models/employees.model";
import { getTribe } from "../models/tribes.model";
import {
  IdParamsSchema,
  IdParamsType,
  UpdateEmployeeBodySchema,
  UpdateEmployeeBodyType,
} from "./schemas";

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "PUT",
    url: "/api/employees/:id",
    schema: {
      params: IdParamsSchema,
      body: UpdateEmployeeBodySchema,
    },
    handler: async (request, reply) => {
      const params = request.params as IdParamsType;
      const employeeBody = request.body as UpdateEmployeeBodyType;

      try {
        let tribe;
        if (employeeBody.tribe_id) {
          tribe = await getTribe(fastify, employeeBody.tribe_id);
        }
        await employeesModel.updateEmployee(fastify, params.id, employeeBody);

        const updatedEmployee = {
          id: params.id,
          name: employeeBody.name,
          title: employeeBody.title,
          tribe: tribe,
        };
        reply.code(200).send(updatedEmployee);
      } catch (error) {
        reply.code(500).send({ error: "something went wrong" });
      }
    },
  };
}
