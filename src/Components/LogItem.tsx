import { memo, useId, useState } from "react";
import { LogItemData } from "../type";
import { LogDetail } from "./LogDetail"; // Import LogDetail component
import styles from "./LogItem.module.css";

// Helper function to convert Date to local ISO string
const toLocalISOString = (date: Date): string => {
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${String(date.getMilliseconds()).padStart(
    3,
    "0",
  )}`;
};

interface LogItemProps {
  data: LogItemData;
  index: number;
}

export const LogItem = memo(({ data, index }: LogItemProps) => {
  const rowElementId = useId();
  const panelId = useId();
  const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded state
  const utcTime = new Date(data._time);
  const formattedLocalIsoTime = toLocalISOString(utcTime); // Use the helper function
  const formattedUtcIsoTime = utcTime.toISOString();
  const { _time, ...rest } = data;
  const updatedData = { time: formattedUtcIsoTime, ...rest };
  const formattedItem = JSON.stringify(updatedData);

  const toggleExpand = () => setIsExpanded((prev) => !prev); // Toggle expanded state

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpand();
    }
  };

  return (
    <div
      className={styles["log-item"]}
      role="row"
      aria-rowindex={index + 1}
      data-testid="log-item"
      style={{ cursor: "pointer" }}
    >
      <div
        id={rowElementId}
        className={styles["log-item-row"]}
        data-testid="log-item-row"
        role="button"
        onClick={toggleExpand}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        tabIndex={0}
      >
        <div className={styles["log-item__time"]} role="cell" data-testid="log-item-time">
          <div
            className={`${styles["expand-indicator"]} ${
              isExpanded ? styles["expand-indicator--expanded"] : ""
            }`}
            aria-hidden="true"
          />
          {formattedLocalIsoTime}
        </div>
        <div className={styles["log-item__message"]} role="cell" data-testid="log-item-message">
          {formattedItem}
        </div>
      </div>
      {isExpanded && ( // Render LogDetail when expanded
        <div
          id={panelId}
          aria-labelledby={rowElementId}
          className={styles["log-item__detail"]}
          data-testid="log-item-detail"
          role="region"
        >
          <LogDetail data={updatedData} />
        </div>
      )}
    </div>
  );
});
