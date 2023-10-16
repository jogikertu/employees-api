import { Knex } from "knex";

export async function seed(knex: Knex) {
  const tribesSeedData = [
    { name: "Internstellar", department: "Other Engineering" },
    { name: "Billing", department: "Product Platform" },
    { name: "Gears", department: "Product Platform" },
    { name: "Data", department: "Engineering" },
  ];

  const employeesSeedData = [
    { name: "Santeri Aaltonen", title: "Intern", tribe_id: 1 },
    { name: "Martin Kisand", title: "Intern", tribe_id: 1 },
    { name: "Maria Kapitonova", title: "Intern", tribe_id: 1 },
    { name: "Litman Huang", title: "Intern", tribe_id: 1 },
    { name: "Kertu Jõgi", title: "Intern", tribe_id: 1 },
    { name: "Kristo Peetermann", title: "Intern", tribe_id: 1 },
    { name: "Jennifer Veismann", title: "Intern", tribe_id: 1 },
    { name: "Eduard Žurin", title: "Intern", tribe_id: 1 },
    { name: "Mykhailo Dorokhov", title: "Engineering L&D Lead", tribe_id: 1 },
    { name: "Rain Saarmäe", title: "Engineering Manager", tribe_id: 2 },
    { name: "Hans Mäesalu", title: "Senior Software Engineer", tribe_id: 2 },
    { name: "Ahmar Siddiqui", title: "Senior Software Engineer", tribe_id: 3 },
    { name: "Alo Aasmäe", title: "Junior Data Engineer", tribe_id: 4 },
  ];

  await knex("tribes").insert(tribesSeedData);
  await knex("employees").insert(employeesSeedData);
}