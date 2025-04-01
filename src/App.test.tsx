import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the main heading", () => {
    render(<App />);
    expect(screen.getByText("Vite + React")).toBeDefined();
  });

  it("increments count when button is clicked", () => {
    render(<App />);
    const button = screen.getByRole("button");
    expect(button.textContent).toContain("count is 0");

    fireEvent.click(button);
    expect(button.textContent).toContain("count is 1");
  });
});
