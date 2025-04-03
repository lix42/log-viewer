import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LogList } from "./LogList";
// ...existing code...

describe("LogList Component", () => {
  it("renders loading state when loading is true", () => {
    render(<LogList items={[]} loading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders no logs message when items are empty and loading is false", () => {
    render(<LogList items={[]} loading={false} />);
    expect(screen.getByText("No logs available")).toBeInTheDocument();
  });

  it("renders log items when items are provided", () => {
    const mockItems = [
      { id: "1", data: { _time: 1724323612592, event: "Event 1" } },
      { id: "2", data: { _time: 1724323612592, event: "Event 2" } },
    ];

    render(<LogList items={mockItems} loading={false} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getByText('{"time":"2024-08-22T10:46:52.592Z","event":"Event 1"}'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('{"time":"2024-08-22T10:46:52.592Z","event":"Event 2"}'),
    ).toBeInTheDocument();
  });

  it("sets correct roles for table and rows", () => {
    const mockItems = [
      { id: "1", data: { _time: 1724323612592, event: "Event 1" } },
      { id: "2", data: { _time: 1724323612592, event: "Event 2" } },
    ];

    render(<LogList items={mockItems} loading={false} />);
    const table = screen.getByRole("table", { name: "Log List" });
    expect(table).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3); // 1 header row + 2 data rows
  });

  it("renders the correct table headers", () => {
    const mockItems = [
      { id: "1", data: { _time: 1724323612592, event: "Event 1" } },
      { id: "2", data: { _time: 1724323612592, event: "Event 2" } },
    ];
    render(<LogList items={mockItems} loading={false} />);
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Event")).toBeInTheDocument();
  });

  // TODO: Test for scroll behavior

  // TODO: Test for dynamic height adjustment
});
