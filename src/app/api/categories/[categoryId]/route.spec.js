/**
 * @jest-environment node
 */

import { db } from "@/lib/db";
import { GET } from "./route";

jest.mock("@/lib/db", () => ({
  db: {
    category: {
      findFirst: jest.fn(),
    },
  },
}));

describe("API CategoryId", () => {
  it("should return category with return status 200", async () => {
    const category = {
      id: "1",
      name: "Category 1",
      created_at: new Date().toISOString(),
    };

    db.category.findFirst.mockResolvedValue(category);

    const params = { categoryId: "1" };
    const req = {};

    const response = await GET(req, { params });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(category);
  });
});
