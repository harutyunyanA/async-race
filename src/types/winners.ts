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

  setPage: (page: number) => void;
  setSorting: (sortBy: SortBy, order: Order) => void;

  getWinners: () => Promise<void>;
  deleteWinner: (id: number) => Promise<void>;
  saveRaceWinner: (id: number, time: number) => Promise<void>;
}
