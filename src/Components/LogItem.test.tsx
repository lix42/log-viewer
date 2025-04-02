import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest"; // Import from vitest
import { LogItem } from "./LogItem"; // Updated import path
import { LogItemData } from "../type";

describe("LogItem Component", () => {
  const mockData: LogItemData = {
    _time: 1678887296789, // Use a number value for _time
    message: "Test log message",
    level: "info",
  };

  it("renders the local ISO time correctly", () => {
    const { getByTestId } = render(<LogItem data={mockData} index={0} />);
    // TODO: how to test the formatted local ISO time?
    expect(getByTestId("log-item-time")).toHaveTextContent(
      /\w{4}-\w{2}-\w{2}T\w{2}:\w{2}:\w{2}\.\w{3}/,
    ); // Regex to match the local ISO format
  });

  it("renders the formatted log item correctly", () => {
    const { getByText } = render(<LogItem data={mockData} index={0} />);
    const formattedItem = JSON.stringify({
      time: new Date(mockData._time).toISOString(),
      message: mockData.message,
      level: mockData.level,
    });
    expect(getByText(formattedItem)).toBeInTheDocument();
  });

  it("sets the correct aria-rowindex", () => {
    const { getByRole } = render(<LogItem data={mockData} index={1} />);
    const row = getByRole("row");
    expect(row).toHaveAttribute("aria-rowindex", "2");
  });

  it("sets the correct roles for row and cells", () => {
    const { getByRole, getAllByRole } = render(<LogItem data={mockData} index={0} />);
    const row = getByRole("row");
    expect(row).toBeInTheDocument();

    const cells = getAllByRole("cell");
    expect(cells).toHaveLength(2); // Expect two cells: one for time and one for message
    expect(cells[0]).toHaveTextContent(/\w{4}-\w{2}-\w{2}T\w{2}:\w{2}:\w{2}\.\w{3}/); // Regex to match the local ISO format
    expect(cells[1]).toHaveTextContent(
      JSON.stringify({
        time: new Date(mockData._time).toISOString(),
        message: mockData.message,
        level: mockData.level,
      }),
    );
  });
});
