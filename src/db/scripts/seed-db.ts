import getKnexInstance from "../knex";

async function migrateDatabase() {
  const knexInstance = getKnexInstance();
  await knexInstance.seed.run();

  console.log("✅ Database seeded");
  process.exit(0);
}

migrateDatabase();