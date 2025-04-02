import { render, screen, waitFor } from "@testing-library/react";
import { http } from "msw";
import { setupServer } from "msw/node";
import { useContext } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { DataContext } from "./DataContext";
import { DataProvider } from "./DataProvider";

const server = setupServer(
  // @ts-ignore
  http.get("https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log", (req, res, ctx) => {
    return res(ctx.text(`{"message":"log1"}\n{"message":"log2"}\n{"message":"log3"}`));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("DataProvider", () => {
  it("provides parsed log data to children", async () => {
    const TestComponent = () => {
      const { items, loading } = useContext(DataContext) ?? {};
      if (loading) return <div>Loading...</div>;
      if (!items) return null;
      return (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.data.message as string}</li>
          ))}
        </ul>
      );
    };

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    waitFor(() => {
      expect(screen.getByText("log1")).toBeInTheDocument();
      expect(screen.getByText("log2")).toBeInTheDocument();
      expect(screen.getByText("log3")).toBeInTheDocument();
    });
  });

  it("handles errors gracefully", async () => {
    server.use(
      // @ts-ignore
      http.get("https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    const TestComponent = () => {
      const { error, loading } = useContext(DataContext) ?? {};
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error occurred</div>;
      return null;
    };

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    waitFor(() => {
      expect(screen.getByText("Error occurred")).toBeInTheDocument();
    });
  });
});
