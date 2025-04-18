export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = JsonPrimitive[] | JsonObject[];

export type JsonObject = {
  [key: string]: JsonPrimitive | JsonArray | JsonObject;
};

export type LogItemData = JsonObject & {
  _time: number;
};

export type LogItemDataWithId = {
  data: LogItemData;
  id: string;
};

export type DataContextType = {
  items: LogItemDataWithId[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  lastModified: string | null;
};
