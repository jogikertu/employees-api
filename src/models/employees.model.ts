import { FastifyInstance } from "fastify";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { EmployeeBodyType, UpdateEmployeeBodyType, searchType } from "../routes/schemas";
import { Tribe } from "./tribes.model";

export interface EmployeeDTO {
  id: number;
  name: string;
  title: string;
  tribe: Tribe;
}

interface EmployeeQueryResult {
  id: number;
  name: string;
  title: string;
  "tribe.id": number;
  "tribe.name": string;
  "tribe.department": string;
}

const TABLE_NAME = "employees";
const EMPLOYEES_REPORT_CACHE_KEY = "employees_report";

const toEmployeeDTO = (employee: EmployeeQueryResult): EmployeeDTO => {
  const employeeDTO: EmployeeDTO = {
    id: employee.id,
    name: employee.name,
    title: employee.title,
    tribe: {
      id: employee["tribe.id"],
      name: employee["tribe.name"],
      department: employee["tribe.department"],
    },
  };

  return employeeDTO;
};

export async function getEmployees(fastify: FastifyInstance, filterText: searchType) {
  const employees = fastify.db
    .from(TABLE_NAME)
    .innerJoin("tribes", "tribes.id", "employees.tribe_id")
    .select(
      "employees.id as id",
      "employees.name as name",
      "employees.title as title",
      "tribes.id as tribe.id",
      "tribes.name as tribe.name",
      "tribes.department as tribe.department"
    );

  if(filterText.name)
  {employees.whereLike('employees.name', `%${filterText.name}%`);}
  if(filterText.title)
  {employees.whereLike('employees.title', `%${filterText.title}%`);}
  if(filterText.tribe)
  {employees.whereLike('tribes.name', `%${filterText.tribe}%`);}

  const employeesQueryResult =await employees.then();
  let result: EmployeeDTO[] = employeesQueryResult.map(toEmployeeDTO);

  
  return result;
}

export async function getEmployee(fastify: FastifyInstance, id: number) {
  const employeeQuery = await fastify.db
    .from(TABLE_NAME)
    .select(
      "employees.id as id",
      "employees.name as name",
      "employees.title as title",
      "tribes.id as tribe.id",
      "tribes.name as tribe.name",
      "tribes.department as tribe.department"
    )
    .innerJoin("tribes", "tribes.id", "employees.tribe_id")
    .where({ 'employees.id' : id })
    .first();

    if(!employeeQuery){
      throw new ResourceNotFoundError(`No employee with id ${id} is found`);
    }

  return toEmployeeDTO(employeeQuery);
}

export async function createEmployee(
  fastify: FastifyInstance,
  employee: EmployeeBodyType
) {
  const id = await fastify.db.from(TABLE_NAME).insert(employee);
  await fastify.cache.del(EMPLOYEES_REPORT_CACHE_KEY);
  return id;
}

export async function deleteEmployee(fastify: FastifyInstance, id: number) {
  await fastify.db.from(TABLE_NAME).where({ id }).del();
  await fastify.cache.del(EMPLOYEES_REPORT_CACHE_KEY);
}

export async function deleteCache(fastify:FastifyInstance) {
  await fastify.cache.set(EMPLOYEES_REPORT_CACHE_KEY, 10)
  try {
    await fastify.cache.del(EMPLOYEES_REPORT_CACHE_KEY);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updateEmployee(
  fastify: FastifyInstance,
  id: number,
  employee: UpdateEmployeeBodyType
) {
  await fastify.db.from(TABLE_NAME).where({ id }).update({
    name: employee.name,
    title: employee.title,
    tribe_id: employee.tribe_id,
  });
}

export async function getGrouped(fastify: FastifyInstance) {
  let groupedEmployees = new Map();
  
  const employeesQuery = await fastify.db
  .from(TABLE_NAME)
  .innerJoin("tribes", "tribes.id", "employees.tribe_id")
  .select(
    "employees.name as name",
    "employees.title",
    "employees.id",
    "tribes.name as tribe.name",
  );
  
  employeesQuery.forEach((employee)=> {
    const tribeName = employee["tribe.name"];

    if (!groupedEmployees.has(tribeName)) {
      groupedEmployees.set(tribeName, []);
    }
    
      groupedEmployees.get(tribeName).push(
        { id: employee.id,
          name: employee.name,
          title: employee.title}
      )
  });

  const groupedEmployeesArray = Array.from(groupedEmployees, ([tribe, employee]) => ({ tribe, employee }));

  return groupedEmployeesArray;

}

