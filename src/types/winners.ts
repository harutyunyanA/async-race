export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerTableData extends Winner {
  name: string;
  color: string;
}

export type SortBy = "wins" | "time";
export type Order = "ASC" | "DESC";

export interface WinnersState {
  winners: Winner[];
  totalCount: number;
  page: number;
  sortBy: SortBy;
  order: Order;

  setWinners: (winners: Winner[]) => void;
  setTotalCount: (count: number) => void;
  setPage: (page: number) => void;
  setSortBy: (sortBy: SortBy) => void;
  setOrder: (order: Order) => void;
  setSorting: (sortBy: SortBy, order: Order) => void;

  createWinner: (winner: Winner) => Promise<Winner>;
  getWinners: () => Promise<void>;
  deleteWinner: (id: number) => Promise<void>;
}
