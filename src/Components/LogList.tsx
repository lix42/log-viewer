import { FC } from "react";
import { LogItemDataWithId } from "../type";
import { LogItem } from "./LogItem";
import styles from "./LogList.module.css"; // Import CSS module

interface LogListProps {
  items: LogItemDataWithId[];
  loading: boolean;
}

export const LogList: FC<LogListProps> = ({ items, loading }) => {
  if (items.length === 0) {
    if (loading) {
      return <div className={styles["loglist-loading"]}>Loading...</div>; // Apply style
    }
    return <div className={styles["loglist-no-logs"]}>No logs available</div>; // Apply style
  }

  return (
    <div role="table" aria-label="Log List" className={styles["loglist-table"]}>
      <div role="rowgroup">
        <div role="row" aria-label="Log Item Header" className={styles["loglist-header-row"]}>
          <div role="cell" className={styles["loglist-header-time"]}>
            Time
          </div>
          <div role="cell" className={styles["loglist-header-event"]}>
            Event
          </div>
        </div>
      </div>
      <div role="rowgroup" className={styles["loglist-row-group"]}>
        {items.map(({ data, id }, index) => (
          <LogItem key={id} data={data} index={index} />
        ))}
      </div>
    </div>
  );
};
