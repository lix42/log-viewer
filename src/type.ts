type JsonPrimitive = string | number | boolean | null;
type JsonArray = JsonPrimitive[] | JsonObject[];

type JsonObject = {
  [key: string]: JsonPrimitive | JsonArray | JsonObject;
};

export type LogItemType = JsonObject & {
  _time: number;
};
