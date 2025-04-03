import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LogListWrapper } from "./Components/LogListWrapper.tsx";
import { DataProvider } from "./DataProvider.tsx";
import "./reset.css";
import "./styles.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <DataProvider>
      <LogListWrapper />
    </DataProvider>
  </StrictMode>,
);
