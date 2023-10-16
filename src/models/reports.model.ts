import { FastifyInstance } from "fastify";
import { Tribe } from "./tribes.model";

const EMPLOYEES_TABLE = "employees";
const TRIBES_TABLE = "tribes";

const EMPLOYEES_REPORT_CACHE_KEY = "employees_report";

export async function getReportsEmployees(fastify: FastifyInstance) {
  const cache = await fastify.cache.get(EMPLOYEES_REPORT_CACHE_KEY);
  if (cache) {
    return JSON.parse(cache);
  }

  const tribes: Tribe[] = await fastify.db.from(TRIBES_TABLE).select();

  const report = [];

  for (const tribe of tribes) {
    const employeesOfTribe = await fastify.db
      .from(EMPLOYEES_TABLE)
      .where({ tribe_id: tribe.id })
      .select();

    report.push({
      tribe: tribe.name,
      employees: employeesOfTribe,
    });
  }

  await fastify.cache.set(EMPLOYEES_REPORT_CACHE_KEY, JSON.stringify(report), {
    EX: 10,
  });

  return report;
}
