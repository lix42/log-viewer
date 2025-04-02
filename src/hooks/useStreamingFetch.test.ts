import { renderHook } from "@testing-library/react";
import { http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { useStreamingFetch } from "./useStreamingFetch";

const url = "https://foo.com/bar.log";

// Mock Server for Intercepting Requests
const server = setupServer(
  // @ts-ignore
  http.get(url, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.body("log line 1\nlog line 2\nlog line 3\n"));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useStreamingFetch Hook", () => {
  it("should fetch and parse streamed data", async () => {
    const { result } = renderHook(() => useStreamingFetch(url));

    expect(result.current.loading).toBe(true);

    vi.waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.data).toEqual(["log line 1", "log line 2", "log line 3"]);
    });
  });

  it("should handle streamed data by chunking", async () => {
    // Function to create a ReadableStream for streaming response
    const createStreamResponse = async function* () {
      yield "chunked line 1\n";
      yield "chunked line 2\n";
      yield "chunked line 3\n";
    };

    server.use(
      // @ts-ignore
      http.get(url, async (_req, res, ctx) => {
        const stream = new ReadableStream({
          async start(controller) {
            for await (const chunk of createStreamResponse()) {
              controller.enqueue(new TextEncoder().encode(chunk));
            }
            controller.close();
          },
        });

        return res(ctx.status(200), new Response(stream));
      }),
    );
    const { result } = renderHook(() => useStreamingFetch(url));
    vi.waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toEqual(["chunked line 1"]);
    });
    vi.waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toEqual(["chunked line 1", "chunked line 2"]);
    });
    vi.waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(["chunked line 1", "chunked line 2", "chunked line 3"]);
    });
  });

  it("should handle fetch errors", async () => {
    server.use(
      // @ts-ignore
      http.get(url, (_req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    const { result } = renderHook(() => useStreamingFetch(url));

    vi.waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual([]);
      expect(result.current.error).not.toBeNull();
    });
  });

  it("should allow refetching data", async () => {
    const { result } = renderHook(() => useStreamingFetch(url));

    vi.waitFor(() => {
      expect(result.current.data).toEqual(["log line 1", "log line 2", "log line 3"]);
    });

    server.use(
      // @ts-ignore
      http.get(url, (_req, res, ctx) => {
        return res(ctx.status(200), ctx.body("new log line\n"));
      }),
    );

    result.current.refetch();

    vi.waitFor(() => {
      expect(result.current.data).toEqual(["new log line"]);
    });
  });
});
