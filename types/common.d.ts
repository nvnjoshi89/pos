export interface Query {
  page: number;
  limit: number;
  startTime?: string;
  endTime?: string;
  sort?: number;
  sortKey?: string;
  search?: string;
}

export type JsonType = Record<string, unknown>;
