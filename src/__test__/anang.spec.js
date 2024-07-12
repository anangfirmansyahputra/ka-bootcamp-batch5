import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/category/page";
import { db } from "../lib/db";
import { useRouter } from "next/router";

jest.mock("../lib/db"); // Mock lib/db

jest.mock(
  "../components/Layouts/DefaultLayout",
  () =>
    ({ children }) =>
      children,
);

jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/user",
    pathname: "/",
    pathname: "/product",
    pathname: "/category",
    pathname: "/order",
    pathname: "/image",
  }),
}));

describe("Home", () => {
  it("renders a calculator", async () => {
    render(await (async () => await Page())());

    // const textElement = screen.getByText(/Hello, World!/i);
    // expect(textElement).toBeInTheDocument();
    await waitFor(() => {
      expect(db.category.findMany).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Category 1")).toBeInTheDocument();
      expect(screen.getByText("Category 2")).toBeInTheDocument();
    });

    expect(screen.getByText("Category")).toBeInTheDocument();
  });
});
