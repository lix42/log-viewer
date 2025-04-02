import { useCallback, useEffect, useRef, useState } from "react";

class AbortError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AbortError";
  }
}

const fetchWithRetry = async (
  url: string,
  retries: number,
  delay: number,
  abortController?: AbortController,
): Promise<Response> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, { signal: abortController?.signal });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response;
    } catch (err) {
      if (abortController?.signal.aborted) {
        throw err; // Abort signal, stop retrying
      }
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw err; // Exhausted retries
      }
    }
  }
  throw new Error("Unreachable code");
};

export const useStreamingFetch = (url: string) => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const promiseRef = useRef<Promise<void> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (promiseRef.current) {
      return promiseRef.current;
    }
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      const response = await fetchWithRetry(url, 3, 1000, abortControllerRef.current); // 3 retries with 1-second delay
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let remaining = "";

      while (reader) {
        const { value, done } = await reader.read();
        if (done) {
          if (remaining) {
            setData((prev) => [...prev, remaining]);
          }
          break;
        }
        const newContent = remaining + decoder.decode(value, { stream: true });
        const lines = newContent.split("\n");
        remaining = lines.pop() || "";
        setData((prev) => [...prev, ...lines]);
      }
    } catch (err) {
      if (
        abortControllerRef.current?.signal.aborted ||
        (err instanceof AbortError && err.message === "Cleanup")
      ) {
        // Ignore abort errors
      } else {
        setError(err as Error);
      }
    } finally {
      setLoading(false);
      promiseRef.current = null;
      abortControllerRef.current = null;
    }
  }, [url]);

  useEffect(() => {
    setData([]);
    setError(null);
    promiseRef.current = fetchData();

    return () => {
      abortControllerRef.current?.abort(new AbortError("Cleanup"));
      promiseRef.current = null;
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    setData([]);
    setError(null);
    promiseRef.current = fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};
