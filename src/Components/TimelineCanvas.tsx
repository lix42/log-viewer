import { ReactNode } from "react";
import styles from "./Timeline.module.css";
import { CanvasBottomMargin, CanvasLeftMargin, CanvasMargin } from "./timelineConstants";

export const TimelineCanvas = ({
  size,
  minCount,
  maxCount,
  bucketsStartTime,
  maxTime,
  children,
}: {
  size: { width: number; height: number };
  minCount: number;
  maxCount: number;
  bucketsStartTime: number;
  maxTime: number;
  children?: ReactNode;
}) => {
  return (
    <>
      <div className={styles["timeline-background"]} aria-hidden />
      <div
        className={styles["timeline-canvas"]}
        style={{
          top: CanvasMargin,
          left: CanvasLeftMargin,
          right: CanvasMargin,
          bottom: CanvasBottomMargin,
        }}
        data-testid="timeline-canvas"
        aria-hidden
      >
        {children}
      </div>
      <div
        className={styles["timeline-label"]}
        data-testid="timeline-label-max-count"
        aria-hidden
        style={{
          top: 4,
          right: size.width - CanvasLeftMargin + 4,
        }}
      >
        {maxCount}
      </div>
      <div
        className={styles["timeline-label"]}
        data-testid="timeline-label-mid-count"
        aria-hidden
        style={{
          top: (size.height - CanvasBottomMargin) / 2 + 4,
          right: size.width - CanvasLeftMargin + 4,
        }}
      >
        {Math.floor((maxCount - minCount) / 2)}
      </div>
      <div
        className={styles["timeline-label"]}
        data-testid="timeline-label-min-count"
        aria-hidden
        style={{
          right: size.width - CanvasLeftMargin + 4,
          bottom: CanvasBottomMargin - 4,
        }}
      >
        {minCount}
      </div>
      <div
        className={styles["timeline-label"]}
        data-testid="timeline-label-start-time"
        aria-hidden
        style={{
          left: CanvasLeftMargin,
          bottom: 4,
        }}
      >
        {new Date(bucketsStartTime).toLocaleString()}
      </div>
      <div
        className={styles["timeline-label"]}
        data-testid="timeline-label-end-time"
        aria-hidden
        style={{
          right: CanvasMargin,
          bottom: 4,
        }}
      >
        {new Date(maxTime).toLocaleString()}
      </div>
    </>
  );
};
