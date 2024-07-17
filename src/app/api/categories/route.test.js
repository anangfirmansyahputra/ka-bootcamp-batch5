/**
 * @jest-environment node
 */

import { matchers } from "jest-json-schema";
import { GET } from "./route";
expect.extend(matchers);

const db = {
  user: {
    findFirst: jest.fn(),
  },
  category: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

describe("API Categories", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return data with status 200", async () => {
    // Mock data to be returned by findMany
    const mockCategories = [
      {
        id: "1",
        name: "Category 1",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Category 2",
        created_at: new Date().toISOString(),
      },
    ];

    // Mock the response from findMany
    db.category.findMany.mockResolvedValue(mockCategories);

    // Mock request and response objects
    const request = {};
    const response = {
      status: jest.fn().mockReturnValue(200), // Mock status method to return 200
      json: jest.fn().mockResolvedValue({
        data: mockCategories,
        success: true,
        message: "Get all categories",
      }), // Mock json method to resolve with mockCategories
    };

    // Call GET function with mocked request and response
    await GET(request, response);

    // Check the response body
    const body = await response.json(); // Get the JSON body from the mocked response

    // Define schema for response body
    const schema = {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              created_at: { type: "string", format: "date-time" },
            },
            required: ["id", "name", "created_at"],
          },
        },
        message: { type: "string" },
      },
      required: ["data", "message"],
    };

    // Assertions
    expect(response.status()).toBe(200); // Assert against status() method
    expect(body).toMatchSchema(schema);
    expect(body.data).toEqual(mockCategories); // Ensure body.data matches mocked categories
  });
});
