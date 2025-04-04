import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LogListWrapper } from "./Components/LogListWrapper.tsx";
import { TimelineWrapper } from "./Components/TimelineWrapper.tsx";
import { DataProvider } from "./DataProvider.tsx";
import styles from "./main.module.css";
import "./reset.css";
import "./styles.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <DataProvider>
      <main className={styles.main}>
        <div className={styles.timeline}>
          <TimelineWrapper />
        </div>
        <div className={styles.logListWrapper}>
          <LogListWrapper options={{ autoSize: false }} />
        </div>
      </main>
    </DataProvider>
  </StrictMode>,
);
