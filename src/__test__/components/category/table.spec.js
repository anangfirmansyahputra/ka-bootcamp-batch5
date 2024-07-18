import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import Table from "../../../app/category/_components/table";

const mockRouter = {
  push: jest.fn(),
  refresh: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter() {
    return mockRouter;
  },
}));

describe("Table Component", () => {
  test("renders categories correctly", () => {
    const categories = [
      {
        id: 1,
        name: "Category 1",
        created_at: new Date("2024-07-13T00:00:00Z"),
      },
      {
        id: 2,
        name: "Category 2",
        created_at: new Date("2024-07-13T00:00:00Z"),
      },
    ];

    render(<Table categories={categories} />);

    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
      expect(
        screen.getAllByText(category.created_at.toDateString()).length,
      ).toBeGreaterThan(0);
    });
  });
});
