
import expect from "expect";
import { destroyTestDb, generateTestDb } from "../test-db";
import getTestFastify from "../test-fastify";

const app = getTestFastify();

describe("DELETE /api/employees/:id", () => {
  beforeEach(async () => {
    await generateTestDb(app);
  });

  afterEach(async () => {
    await destroyTestDb(app);
  });

  it("Should not have succesfully deleted", async() => {
    const res = await app.inject({
        url: "/api/employees/1",
        method: "DELETE",
      });
      const response = res.json();
    
      expect(response).toEqual({"success": true})
  })

  it("Should have 9 employees", async() => {
    let res = await app.inject({
        url: "/api/employees/1",
        method: "DELETE",
      });

      let response = res.json();

      res = await app.inject({
        url: "/api/employees",
        method: "GET",
      });

      response = res.json();

      expect(response).toHaveLength(9);
  })

});