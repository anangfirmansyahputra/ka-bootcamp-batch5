// __mocks__/db.js
export const db = {
  category: {
    findMany: jest.fn().mockResolvedValue([
      { id: 1, name: "Category 1", created_at: "2023-01-01" },
      { id: 2, name: "Category 2", created_at: "2023-01-02" },
    ]),
  },
};
