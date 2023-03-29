"use strict";
import {describe, expect, test, beforeAll, afterAll} from '@jest/globals';
import app from "../src/app";
import {FastifyInstance} from "fastify";

describe("testing user endpoint", () => {
  let appInstance: FastifyInstance;

  beforeAll(async () => {
    appInstance = await app({logger: true});
  })

  afterAll(async () => {
    await appInstance.close();
  })

  test("testing GET user", async () => {
    const userId = "7078bc23-9dd6-460d-8b93-082254fee63a";
    const response = await appInstance.inject({
      method: "GET",
      url: `/users/${userId}`
    });
    expect(response.statusCode).toBe(200);
    const responseJSON = JSON.parse(response.body);
    expect(responseJSON).toMatchObject({
      id: userId,
      firstName: "John",
      lastName: "Doe",
    });
  });
});
