import { FastifyInstance } from "fastify";

import deleteCache from "./delete-cache";
import deleteEmployeesId from "./delete-employees-id";
import getEmployees from "./get-employees";
import getEmployeesId from "./get-employees-id";
import getGrouped from "./get-grouped";
import getReportsEmployees from "./get-reports-employees";
import getTribes from "./get-tribes";
import getTribe from "./get-tribes-id";
import updateEmployee from "./patch-employee-id";
import postEmployees from "./post-employees";

export default async function (fastify: FastifyInstance) {
  fastify.route(getEmployees(fastify));
  fastify.route(getEmployeesId(fastify));
  fastify.route(deleteEmployeesId(fastify));
  fastify.route(postEmployees(fastify));
  fastify.route(getTribes(fastify));
  fastify.route(getTribe(fastify));
  fastify.route(getGrouped(fastify));
  fastify.route(getReportsEmployees(fastify));
  fastify.route(deleteCache(fastify));
  fastify.route(updateEmployee(fastify));
}
