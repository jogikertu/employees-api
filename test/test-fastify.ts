import Fastify from "fastify";
import fp from "fastify-plugin";
import app from "../src/app";

export default function () {
  const testApp = Fastify();

  beforeAll(async () => {
    void testApp.register(fp(app));
    await testApp.ready();
  });

  afterAll(() => testApp.close());

  return testApp;
}