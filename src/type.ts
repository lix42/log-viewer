type JsonPrimitive = string | number | boolean | null;
type JsonArray = JsonPrimitive[] | JsonObject[];

type JsonObject = {
  [key: string]: JsonPrimitive | JsonArray | JsonObject;
};

export type LogItemData = JsonObject & {
  _time: number;
};

export type LogItemDataWithId = {
  data: LogItemData;
  id: string;
};