const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");

describe("GET products", () => {
  test("should return status code 200 and valid JSON", async () => {
    const response = await request(app)
      .get("/api/products")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.type).toEqual("application/json");
  });
});
