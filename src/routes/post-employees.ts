import { FastifyInstance, RouteOptions } from "fastify";
import * as employeesModel from "../models/employees.model";
import { EmployeeDTO } from '../models/employees.model';
import { getTribe } from "../models/tribes.model";
import { EmployeeBodySchema, EmployeeBodyType } from "./schemas";
 

export default function (fastify: FastifyInstance): RouteOptions {
  return {
    method: "POST",
    url: "/api/employees",
    schema: {
      body: EmployeeBodySchema,
    },
    handler: async (request, reply) => {
      const employeeBody = request.body as EmployeeBodyType;
      try {
        const id = await employeesModel.createEmployee(fastify, employeeBody);
        const tribe = await getTribe(fastify, employeeBody.tribe_id);
        const createdEmployee: EmployeeDTO = {
          id: id[0],
          name: employeeBody.name,
          title: employeeBody.title,
          tribe: tribe,
        };
        reply.code(201).send({ createdEmployee });
      } catch (error) {
        reply.code(500).send({ error: "something went wrong" });
      }

    },
  };
}
