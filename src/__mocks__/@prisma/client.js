// __mocks__/@prisma/client.js
const { PrismaClient } = jest.requireActual("@prisma/client");

class MockPrismaClient {
  constructor() {
    this.category = {
      findMany: jest.fn().mockResolvedValue([
        { id: 1, name: "Category 1", created_at: "2023-01-01" },
        { id: 2, name: "Category 2", created_at: "2023-01-02" },
      ]),
    };
  }
}

const prisma = new MockPrismaClient();

module.exports = { PrismaClient: MockPrismaClient, prisma };
