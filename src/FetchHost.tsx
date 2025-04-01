import { useEffect, useRef, useState } from "react";
import { useStreamingFetch } from "./hooks/useStremingFetch";

const getKey = (index: number) => index.toString();

export const FetchHost = () => {
  const { data, loading, error } = useStreamingFetch(
    "https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log",
  );

  return (
    <div>
      <h1>Fetch Host</h1>
      {!data.length && loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data.length > 0 && (
        <div>
          <h2>Data:</h2>
          <ul>
            {data.map((item, index) => (
              <li key={getKey(index)}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
