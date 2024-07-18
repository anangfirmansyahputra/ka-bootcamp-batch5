// Form.test.js
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Form from "@/app/category/_components/form"; // Ganti dengan path yang benar
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

jest.mock("axios");
jest.mock("js-cookie");
jest.mock("sweetalert2");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Form Component", () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(() => {
    Cookies.get = jest.fn().mockReturnValue("mockToken");
    useRouter.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders form with initial data", () => {
    const data = {
      id: 1,
      name: "Category 1",
      created_at: new Date("2024-07-13T00:00:00Z"),
    };

    render(<Form data={data} />);

    expect(screen.getByDisplayValue("Category 1")).toBeInTheDocument();
  });

  test("submits new category", async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    render(<Form />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "New Category" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        "/api/categories",
        { name: "New Category" },
        expect.any(Object),
      ),
    );

    expect(mockRouter.push).toHaveBeenCalledWith("/category");
    expect(mockRouter.refresh).toHaveBeenCalled();
  });

  test("updates existing category", async () => {
    const data = {
      id: 1,
      name: "Category 1",
      created_at: new Date("2024-07-13T00:00:00Z"),
    };

    axios.patch.mockResolvedValueOnce({ data: {} });

    render(<Form data={data} />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Updated Category" },
    });

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() =>
      expect(axios.patch).toHaveBeenCalledWith(
        `/api/categories/${data.id}`,
        { name: "Updated Category" },
        expect.any(Object),
      ),
    );

    expect(mockRouter.push).toHaveBeenCalledWith("/category");
    expect(mockRouter.refresh).toHaveBeenCalled();
  });

  test("handles submission error", async () => {
    axios.post.mockRejectedValueOnce(new Error("Submission error"));

    render(<Form />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "New Category" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Error",
        text: "Submission error",
        icon: "error",
      }),
    );
  });
});
