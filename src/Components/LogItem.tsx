import React from "react";
import { LogItemType } from "../type";
import styles from "./LogItem.module.css"; // Use CSS modules

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
  item: LogItemType;
  index: number;
}

export const LogItem = React.memo(({ item, index }: LogItemProps) => {
  const utcTime = new Date(item._time);
  const formattedLocalIsoTime = toLocalISOString(utcTime); // Use the helper function
  const formattedUtcIsoTime = utcTime.toISOString();
  const { _time, ...rest } = item;
  const formattedItem = JSON.stringify({
    time: formattedUtcIsoTime,
    ...rest,
  });
  return (
    <div className={styles["log-item"]} role="row" aria-rowindex={index + 1}>
      <div className={styles["log-item__time"]} role="cell">
        {formattedLocalIsoTime}
      </div>
      <div className={styles["log-item__message"]} role="cell">
        {formattedItem}
      </div>
    </div>
  );
});
