import { JsonArray, JsonObject, JsonPrimitive } from "../type";
import styles from "./LogDetail.module.css";

interface LogDetailProps {
  data: JsonObject;
}

const renderValue = (value: JsonPrimitive | JsonArray | JsonObject) => {
  if (typeof value === "string") {
    return <span className={styles["string-value"]}>"{value}"</span>;
  }
  if (typeof value === "number") {
    return <span className={styles["number-value"]}>{value}</span>;
  }
  if (typeof value === "boolean") {
    return <span className={styles["boolean-value"]}>{value ? "true" : "false"}</span>;
  }
  if (Array.isArray(value)) {
    return <span className={styles["array-value"]}>{JSON.stringify(value)}</span>;
  }
  if (value === null) {
    return <span className={styles["null-value"]}>null</span>;
  }
  if (typeof value === "object" && value !== null) {
    return <span className={styles["object-value"]}>{JSON.stringify(value)}</span>;
  }
  return null;
};

const renderTree = (data: JsonObject) => {
  if (typeof data === "object" && data !== null) {
    return (
      <ul className={styles["prop-list"]}>
        {Object.entries(data).map(([key, value]) => {
          return (
            <li key={key} className={styles["list-item"]}>
              <span
                className={styles["item-key"]}
                title={key}
                data-testid={`log-detail-key-${key}`}
              >
                {key}:
              </span>
              <span
                className={styles["item-value"]}
                title={JSON.stringify(value)}
                data-testid={`log-detail-value-${key}`}
              >
                {renderValue(value)}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
  return null;
};

export const LogDetail = ({ data }: LogDetailProps) => {
  return (
    <div className={styles["log-detail"]} data-testid="log-detail">
      <div>{"{"}</div>
      {renderTree(data)}
      <div>{"}"}</div>
    </div>
  );
};
