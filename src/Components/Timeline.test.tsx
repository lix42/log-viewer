import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LogItemDataWithId } from "../type";
import { Timeline } from "./Timeline";

describe("Timeline Component", () => {
  const mockItems: LogItemDataWithId[] = [
    { id: "1", data: { _time: 1000 } },
    { id: "2", data: { _time: 2000 } },
    { id: "3", data: { _time: 3000 } },
  ];

  it("renders without crashing", () => {
    render(<Timeline items={mockItems} loading={false} lastModified={"1"} />);
    expect(screen.getByTestId("timeline")).toBeInTheDocument();
  });

  it("shows loading indicator when loading is true", () => {
    render(<Timeline items={[]} loading={true} lastModified={"1"} />);
    expect(screen.getByTestId("timeline-loading")).toBeInTheDocument();
  });

  it.skip("displays the correct number of buckets", () => {
    // TODO: Implement a test to check if the bucket counts are rendered correctly
    // This would require a more complex setup to mock the viewport size
  });

  it.skip("renders bucket counts correctly", () => {
    // TODO: Implement a test to check if the bucket counts are rendered correctly
    // This would require a more complex setup to mock the viewport size
  });

  it.skip("should update the timeline when items change", () => {});
});
