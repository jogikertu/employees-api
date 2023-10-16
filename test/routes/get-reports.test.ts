import expect from "expect";
import { destroyTestDb, generateTestDb } from "../test-db";
import getTestFastify from "../test-fastify";

const app = getTestFastify();

describe(" GET /api/employees/report", () => {
    beforeEach(async () => {
      await generateTestDb(app);
    });
  
    afterEach(async () => {
      await destroyTestDb(app);
    });

    it("should return employees filtered by tribes", async () => {
        const res = await app.inject({
            url: "/api/employees/report",
            method: "GET",
        });

        const response = res.json();

        expect(response).toHaveLength(3);
    })
  
  });