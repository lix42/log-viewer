type JsonObject = {
  [key: string]: string | number | boolean | null | JsonObject | JsonObject[];
};

export type LogItemType = JsonObject & {
  _time: number;
};
