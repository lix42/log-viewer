import { memo } from "react";
import { LogItemData } from "../type";
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
  const utcTime = new Date(data._time);
  const formattedLocalIsoTime = toLocalISOString(utcTime); // Use the helper function
  const formattedUtcIsoTime = utcTime.toISOString();
  const { _time, ...rest } = data;
  const updatedData = { time: formattedUtcIsoTime, ...rest };
  const formattedItem = JSON.stringify(updatedData);
  return (
    <div className={styles["log-item"]} role="row" aria-rowindex={index + 1} data-testid="log-item">
      <div className={styles["log-item__time"]} role="cell" data-testid="log-item-time">
        {formattedLocalIsoTime}
      </div>
      <div className={styles["log-item__message"]} role="cell" data-testid="log-item-message">
        {formattedItem}
      </div>
    </div>
  );
});
