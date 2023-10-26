import { FastifyInstance } from "fastify";
import { ResourceNotFoundError } from "../errors/resource-not-found";

export interface Tribe {
  id: number;
  name: string;
  department: string;
}
const TABLE_NAME = "tribes";

/**const formatTribessDTO = (tribe: Tribe): Tribe => {
  return {
    id: tribe.id,
    name: tribe.name,
    department: tribe.department,
  };
};*/

export async function getTribes(fastify: FastifyInstance): Promise<Tribe[]> {
  const tribes = await fastify.db.from(TABLE_NAME).select();

  return tribes;
}
export async function getTribe(fastify: FastifyInstance, id: number): Promise<Tribe> {
  const tribe = await fastify.db
    .from(TABLE_NAME)
    .where({ "tribes.id": id })
    .select()
    .first();

    if(!tribe) throw new ResourceNotFoundError(`No tribe with id ${id} is found`);

  return tribe;
}

