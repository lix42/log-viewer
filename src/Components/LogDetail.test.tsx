import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LogDetail } from "./LogDetail";

describe("LogDetail Component", () => {
  it("renders the JSON object with keys and values", () => {
    const mockData = {
      name: "John Doe",
      age: 30,
      isAdmin: true,
      tags: ["developer", "tester"],
      address: {
        city: "New York",
        zip: "10001",
      },
      nullValue: null,
    };

    render(<LogDetail data={mockData} />);

    // Verify the structure
    expect(screen.getByText("{")).toBeInTheDocument();
    expect(screen.getByText("}")).toBeInTheDocument();

    // Verify roles
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(Object.keys(mockData).length);

    // Verify keys and values
    expect(screen.getByTestId("log-detail-key-name")).toHaveTextContent("name:");
    expect(screen.getByTestId("log-detail-value-name")).toHaveTextContent('"John Doe"');

    expect(screen.getByTestId("log-detail-key-age")).toHaveTextContent("age:");
    expect(screen.getByTestId("log-detail-value-age")).toHaveTextContent("30");

    expect(screen.getByTestId("log-detail-key-isAdmin")).toHaveTextContent("isAdmin:");
    expect(screen.getByTestId("log-detail-value-isAdmin")).toHaveTextContent("true");

    expect(screen.getByTestId("log-detail-key-tags")).toHaveTextContent("tags:");
    expect(screen.getByTestId("log-detail-value-tags")).toHaveTextContent('["developer","tester"]');

    expect(screen.getByTestId("log-detail-key-address")).toHaveTextContent("address:");
    expect(screen.getByTestId("log-detail-value-address")).toHaveTextContent(
      '{"city":"New York","zip":"10001"}',
    );

    expect(screen.getByTestId("log-detail-key-nullValue")).toHaveTextContent("nullValue:");
    expect(screen.getByTestId("log-detail-value-nullValue")).toHaveTextContent("null");
  });
});
