import React from "react";
import { LogItemType } from "../type";
import styles from "./LogItem.module.css"; // Use CSS modules

interface LogItemProps {
  item: LogItemType;
  index: number;
}

export const LogItem = React.memo(({ item, index }: LogItemProps) => {
  const formattedTime = new Date(item._time).toISOString();
  const { _time, ...rest } = item;
  const formattedItem = JSON.stringify({
    time: formattedTime,
    ...rest,
  });
  return (
    <div className={styles["log-item"]} role="row" aria-rowindex={index + 1}>
      <div className={styles["log-item__time"]} role="cell">
        {formattedTime}
      </div>
      <div className={styles["log-item__message"]} role="cell">
        {formattedItem}
      </div>
    </div>
  );
});
