import { createContext } from "react";
import { DataContextType } from "./type";

export const DataContext = createContext<DataContextType | null>(null);
