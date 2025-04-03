import { FC, useEffect, useRef, useState } from "react";
import { LogItemDataWithId } from "../type";
import { LogItem } from "./LogItem";
import styles from "./LogList.module.css"; // Import CSS module

interface LogListProps {
  items: LogItemDataWithId[];
  loading: boolean;
  options?: {
    autoSize?: boolean;
  };
}

// IMPORTANT: Adjust the height of each log item based on the UI design
// const _ItemHeight = 42; // Height of each log item in pixels

export const LogList: FC<LogListProps> = ({ items, loading, options = { autoSize: true } }) => {
  const optionsRef = useRef(options);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [inScopeCount, setInScopeCount] = useState(100);

  const containerElem = containerRef.current;

  useEffect(() => {
    if (!optionsRef.current.autoSize) {
      return;
    }
    const updateContainerHeight = () => {
      if (containerElem) {
        const newContainerTop = containerElem.getBoundingClientRect().top;
        setContainerHeight(window.innerHeight - newContainerTop); // Calculate container height
      }
    };

    updateContainerHeight(); // Initial state update
    window.addEventListener("resize", updateContainerHeight);
    return () => window.removeEventListener("resize", updateContainerHeight);
  }, [containerElem]);

  useEffect(() => {
    if (!containerElem) return;

    const handleScroll = () => {
      // TODO: clean up the top elements scrolling out of view
      const containerHeight = containerElem.clientHeight;
      const contentHeight = containerElem.scrollHeight;
      const scrollPosition = containerElem.scrollTop;
      if (scrollPosition + containerHeight * 3 > contentHeight) {
        setInScopeCount((prev) => Math.min(prev + 100, items.length));
      }
    };

    // TODO: remove the scoll event listener if already scrolled to the bottom
    containerElem.addEventListener("scroll", handleScroll);
    return () => containerElem.removeEventListener("scroll", handleScroll);
  }, [containerElem, items.length]);

  if (items.length === 0) {
    if (loading) {
      return <div className={styles["loglist-loading"]}>Loading...</div>;
    }
    return <div className={styles["loglist-no-logs"]}>No logs available</div>;
  }

  return (
    <div
      ref={containerRef}
      role="table"
      aria-label="Log List"
      className={styles["loglist-table"]}
      style={containerHeight ? { height: `${containerHeight}px` } : {}} // Dynamically set height
    >
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
        {items
          .filter((_, index) => index < inScopeCount)
          .map(({ data, id }, index) => (
            <LogItem key={id} data={data} index={index} />
          ))}
      </div>
    </div>
  );
};
