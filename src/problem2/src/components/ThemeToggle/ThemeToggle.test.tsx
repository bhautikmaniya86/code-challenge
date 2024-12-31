import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "../../contexts/ThemeContext";

jest.mock("../../contexts/ThemeContext", () => ({
  useTheme: jest.fn(),
}));

describe("ThemeToggle", () => {
  it("renders with a light theme by default", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: jest.fn(),
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();
  });

  it("renders with a dark theme when toggled", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      toggleTheme: jest.fn(),
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button", {
      name: /switch to light mode/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("calls toggleTheme when clicked", () => {
    const mockToggleTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);
    fireEvent.click(
      screen.getByRole("button", { name: /switch to dark mode/i })
    );
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
