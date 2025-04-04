import { useContext } from "react";
import { DataContext } from "../DataContext";
import { Timeline } from "./Timeline";

export const TimelineWrapper = () => {
  const { items, loading, lastModified } = useContext(DataContext) ?? { items: [], loading: false };
  // TODO: use deferredValue to reduce rendering
  return <Timeline items={items} loading={loading} lastModified={lastModified} />;
};
