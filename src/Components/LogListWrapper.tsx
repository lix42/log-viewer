import { useContext } from "react";
import { DataContext } from "../DataContext";
import { LogList, LogListOptions } from "./LogList";

interface LogListWrapperProps {
  options?: LogListOptions;
}

/**
 * LogListWrapper component that wraps the LogList component and provides data from the DataContext.
 * @param {LogListWrapperProps} props - The props for the LogListWrapper component.
 * @returns {JSX.Element | null} - Returns the LogList component or null if no items are available.
 */
export const LogListWrapper = (props: LogListWrapperProps) => {
  const { items, loading } = useContext(DataContext) ?? {};
  if (!items) {
    return null;
  }
  return <LogList items={items} loading={loading ?? true} options={props.options} />;
};
