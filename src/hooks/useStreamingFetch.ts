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

type UseStreamingFetchOptions = {
  maxRetries?: number;
  retryDelay?: number;
  intervalBetweenRead?: number;
};

export const useStreamingFetch = (url: string, options: UseStreamingFetchOptions = {}) => {
  const optionsRef = useRef<UseStreamingFetchOptions>(options);
  const lastModifiedRef = useRef<string | null>(null);
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const promiseRef = useRef<Promise<void> | null>(null);

  const fetchData = useCallback(
    async (abortController: AbortController) => {
      if (promiseRef.current) {
        return promiseRef.current;
      }

      try {
        setLoading(true);
        const response = await fetchWithRetry(
          url,
          optionsRef.current.maxRetries ?? 3,
          optionsRef.current.retryDelay ?? 1000,
          abortController,
        ); // 3 retries with 1-second delay
        const lastModified = response.headers.get("last-modified");
        if (!lastModified || lastModified !== lastModifiedRef.current) {
          lastModifiedRef.current = lastModified;
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
            if (optionsRef.current.intervalBetweenRead) {
              await new Promise((resolve) =>
                setTimeout(resolve, optionsRef.current.intervalBetweenRead),
              );
            }
          }
        }
        setLoading(false);
        promiseRef.current = null;
      } catch (err) {
        if (
          abortController.signal.aborted ||
          (err instanceof AbortError && err.message === "Cleanup")
        ) {
          // Ignore abort errors
        } else {
          setLoading(false);
          promiseRef.current = null;
          setError(err as Error);
        }
      }
    },
    [url],
  );

  useEffect(() => {
    setData([]);
    setError(null);
    const abortController = new AbortController();
    promiseRef.current = fetchData(abortController);

    return () => {
      abortController.abort(new AbortError("Cleanup"));
      promiseRef.current = null;
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    setData([]);
    setError(null);
    // TODO: remember all the AbortController instances and abort them on cleanup
    promiseRef.current = fetchData(new AbortController());
  }, [fetchData]);

  return { lastModified: lastModifiedRef.current, data, loading: loading, error, refetch };
};
