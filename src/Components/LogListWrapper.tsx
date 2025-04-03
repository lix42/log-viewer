import { useContext } from "react";
import { DataContext } from "../DataContext";
import { LogList } from "./LogList";

export const LogListWrapper = () => {
  const { items, loading } = useContext(DataContext) ?? {};
  if (!items) {
    return null;
  }
  return <LogList items={items} loading={loading ?? true} />;
};
