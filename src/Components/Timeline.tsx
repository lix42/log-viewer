import React, { useEffect, useRef, useState } from "react";
import { LogItemDataWithId } from "../type";
import styles from "./Timeline.module.css";

const BucketWidth = 60; //60px
const BucketGap = 5; //5px
const CanvasMargin = 10; //10px

interface TimelineProps {
  items: LogItemDataWithId[];
  loading: boolean;
  lastModified?: string | null;
}

const TimelineComponent = ({ items, loading, lastModified }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timeCountMap, setTimeCountMap] = useState<Record<number, number>>({});
  const [processedCount, setProcessedCount] = useState(0);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [minTime, setMinTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [minCount, setMinCount] = useState(0);
  const [maxCount, setMaxCount] = useState(0);
  const [bucketsCount, setBucketsCount] = useState(0);
  const [bucketsDuration, setBucketsDuration] = useState(0);
  const [bucketsStartTime, setBucketsStartTime] = useState(0);
  const [buckets, setBuckets] = useState<number[]>([]);

  useEffect(() => {
    if (lastModified) {
      setTimeCountMap({});
      setMinTime(0);
      setMaxTime(0);
      setMinCount(0);
      setMaxCount(0);
      setBucketsStartTime(0);
      setBucketsDuration(0);
      setBuckets([]);
    }
  }, [lastModified]);

  useEffect(() => {
    const updateSize = () => {
      if (timelineRef.current) {
        const { offsetWidth, offsetHeight } = timelineRef.current;
        setSize({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateSize(); // Initial size measurement
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: It seems biome has a bug with useEffect and it doesn't detect the dependencies correctly
  useEffect(() => {
    if (items && items.length > processedCount) {
      let _minTime = minTime || Number.MAX_VALUE;
      let _maxTime = maxTime || Number.MIN_VALUE;
      const _timeCountMap = { ...timeCountMap };
      for (let index = processedCount; index < items.length; index++) {
        const item = items[index];
        if (item.data._time < _minTime) {
          _minTime = item.data._time;
        }
        if (item.data._time > _maxTime) {
          _maxTime = item.data._time;
        }
        if (_timeCountMap[item.data._time]) {
          _timeCountMap[item.data._time]++;
        } else {
          _timeCountMap[item.data._time] = 1;
        }
      }
      setMinTime(_minTime);
      setMaxTime(_maxTime);
      setTimeCountMap(_timeCountMap);
      setProcessedCount(items.length);
    }
  }, [items, processedCount, timeCountMap, minTime, maxTime]);

  useEffect(() => {
    if (size.width > 0) {
      const canvasWidth = size.width - CanvasMargin * 2;
      const _bucketsCount = Math.floor((canvasWidth - BucketGap) / (BucketWidth + BucketGap));
      setBucketsCount(_bucketsCount);
      if (maxTime && minTime) {
        const _bucketsDuration = Math.ceil((maxTime - minTime) / _bucketsCount);
        setBucketsDuration(_bucketsDuration);
        const _bucketsStartTime = Math.floor(minTime - _bucketsDuration / 2);
        setBucketsStartTime(_bucketsStartTime);
        const _buckets = new Array(_bucketsCount).fill(0);
        setBuckets(_buckets);
      }
    }
  }, [size.width, maxTime, minTime]);

  useEffect(() => {
    const entries = Object.entries(timeCountMap);
    if (entries.length > 0 && buckets.length > 0) {
      const _buckets = new Array(bucketsCount).fill(0);
      for (const entry of entries) {
        const index = Math.floor((parseInt(entry[0], 10) - bucketsStartTime) / bucketsDuration);
        if (index >= 0 && index < _buckets.length) {
          _buckets[index] += entry[1];
        }
      }
      setBuckets(_buckets);
      let _minCount = Number.MAX_VALUE;
      let _maxCount = Number.MIN_VALUE;
      for (const bucket of _buckets) {
        if (bucket < _minCount) {
          _minCount = bucket;
        }
        if (bucket > _maxCount) {
          _maxCount = bucket;
        }
      }
      if (_maxCount - _minCount < _minCount * 0.8) {
        _minCount = _minCount * 0.8;
      } else {
        _minCount = 0;
      }
      setMinCount(_minCount);
      setMaxCount(_maxCount);
    }
  }, [timeCountMap, buckets, bucketsStartTime, bucketsDuration, bucketsCount]);

  return (
    <div ref={timelineRef} className={styles.timeline} data-testid="timeline">
      <h1>Timeline</h1>
      <ol data-testid="timeline-buckets">
        {buckets.map((bucket, index) => {
          const bucketStartTime = bucketsStartTime + index * bucketsDuration;
          const bucketEndTime = bucketStartTime + bucketsDuration;
          return (
            <li key={bucketStartTime} data-testid="timeline-bucket">
              {new Date(bucketStartTime).toLocaleString()} -{" "}
              {new Date(bucketEndTime).toLocaleString()} Count: {bucket}
            </li>
          );
        })}
      </ol>
      <div className={styles["timeline-background"]} />
      <div
        className={styles["timeline-canvas"]}
        style={{
          // TODO: use CSS in JS to set the size and position of the canvas
          top: CanvasMargin,
          left: CanvasMargin,
          right: CanvasMargin,
          bottom: CanvasMargin,
        }}
        data-testid="timeline-canvas"
      >
        {buckets.map((bucket, index) => {
          const bucketStartTime = bucketsStartTime + index * bucketsDuration;
          const bucketWidth = BucketWidth + BucketGap;
          const bucketHeight =
            ((bucket - minCount) / (maxCount - minCount)) * (size.height - CanvasMargin * 2);
          const left = index * bucketWidth + BucketGap;

          return (
            <div
              key={bucketStartTime}
              className={styles["timeline-bucket"]}
              style={{
                width: BucketWidth,
                height: bucketHeight,
                left,
              }}
              data-testid="timeline-bucket"
            >
              {bucket}
            </div>
          );
        })}
      </div>
      {loading && <div className={styles["timeline-loading"]} data-testid="timeline-loading" />}
    </div>
  );
};

export const Timeline = React.memo(TimelineComponent);
