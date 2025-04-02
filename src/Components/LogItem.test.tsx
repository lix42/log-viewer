import { render, screen, fireEvent } from "@testing-library/react";
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

  it("renders the log item with collapsed state by default", () => {
    render(<LogItem data={mockData} index={0} />);
    const logItem = screen.getByTestId("log-item-row");
    const logDetail = screen.queryByTestId("log-item-detail");

    expect(logItem).toBeInTheDocument();
    expect(logDetail).not.toBeInTheDocument(); // Detail should not be rendered initially
  });

  it("expands and collapses the log detail on click", () => {
    render(<LogItem data={mockData} index={0} />);
    const logItem = screen.getByTestId("log-item-row");
    const logDetailBeforeClick = screen.queryByTestId("log-item-detail");

    expect(logDetailBeforeClick).not.toBeInTheDocument(); // Detail should not be rendered initially

    // Simulate click to expand
    fireEvent.click(logItem);
    const logDetailAfterClick = screen.getByTestId("log-item-detail");
    expect(logDetailAfterClick).toBeInTheDocument(); // Detail should be rendered after click

    // Simulate click to collapse
    fireEvent.click(logItem);
    const logDetailAfterSecondClick = screen.queryByTestId("log-item-detail");
    expect(logDetailAfterSecondClick).not.toBeInTheDocument(); // Detail should not be rendered after second click
  });

  it("expands and collapses the log detail on Enter key press", () => {
    render(<LogItem data={mockData} index={0} />);
    const logItem = screen.getByTestId("log-item-row");
    const logDetailBeforeKeyPress = screen.queryByTestId("log-item-detail");

    expect(logDetailBeforeKeyPress).not.toBeInTheDocument(); // Detail should not be rendered initially

    // Simulate Enter key press to expand
    fireEvent.keyDown(logItem, { key: "Enter" });
    const logDetailAfterKeyPress = screen.getByTestId("log-item-detail");
    expect(logDetailAfterKeyPress).toBeInTheDocument(); // Detail should be rendered after key press

    // Simulate Enter key press to collapse
    fireEvent.keyDown(logItem, { key: "Enter" });
    const logDetailAfterSecondKeyPress = screen.queryByTestId("log-item-detail");
    expect(logDetailAfterSecondKeyPress).not.toBeInTheDocument(); // Detail should not be rendered after second key press
  });

  it("expands and collapses the log detail on Space key press", () => {
    render(<LogItem data={mockData} index={0} />);
    const logItem = screen.getByTestId("log-item-row");
    const logDetailBeforeKeyPress = screen.queryByTestId("log-item-detail");

    expect(logDetailBeforeKeyPress).not.toBeInTheDocument(); // Detail should not be rendered initially

    // Simulate Space key press to expand
    fireEvent.keyDown(logItem, { key: " " });
    const logDetailAfterKeyPress = screen.getByTestId("log-item-detail");
    expect(logDetailAfterKeyPress).toBeInTheDocument(); // Detail should be rendered after key press

    // Simulate Space key press to collapse
    fireEvent.keyDown(logItem, { key: " " });
    const logDetailAfterSecondKeyPress = screen.queryByTestId("log-item-detail");
    expect(logDetailAfterSecondKeyPress).not.toBeInTheDocument(); // Detail should not be rendered after second key press
  });
});
