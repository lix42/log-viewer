import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FetchHost } from "./FetchHost.tsx";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}
createRoot(root).render(
  <StrictMode>
    <FetchHost />
  </StrictMode>,
);
