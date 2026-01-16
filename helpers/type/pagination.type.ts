export type PaginationType = {
  hasNext: boolean;
  nextCursor: string | null;
  take: number;
  totalAll: number;
  totalFiltered: number;
};
