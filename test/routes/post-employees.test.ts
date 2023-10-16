import { destroyTestDb, generateTestDb } from "../test-db";
import getTestFastify from "../test-fastify";

const app = getTestFastify();

describe("POST /api/employees", () => {
    beforeEach(async () => {
      await generateTestDb(app);
    });
  
    afterEach(async () => {
      await destroyTestDb(app);
    });
  

  
    it("Should have 11 employees", async() => {
      let res = await app.inject({
          url: "/api/employees",
          body: {
            name: "Jane Doe",
            title: "CTO",
            tribe_id: "1"
          },
          method: "POST",
        });
  
        let response = res.json();

        res = await app.inject({
            url: "/api/employees",
            method: "GET",
          });
    
        response = res.json();
  
        expect(response).toHaveLength(11);
    })
  
  });